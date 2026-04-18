import "dotenv/config";
import { Router, Request, Response } from "express";
import { Pool } from "pg";

const router = Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

/**
 * GET /api/artisans/nearby
 * Query params:
 *   lat     — user's latitude  (required)
 *   lng     — user's longitude (required)
 *   radius  — search radius in km (optional, default 50)
 *   limit   — max results (optional, default 20)
 *
 * Uses the Haversine formula inline in PostgreSQL so we get sub-ms
 * filtering + ordering entirely in the DB.
 */
router.get("/nearby", async (req: Request, res: Response): Promise<void> => {
  const lat    = parseFloat(req.query.lat    as string);
  const lng    = parseFloat(req.query.lng    as string);
  const radius = parseFloat(req.query.radius as string) || 50;
  const limit  = parseInt(req.query.limit   as string) || 20;

  if (isNaN(lat) || isNaN(lng)) {
    res.status(400).json({ success: false, error: "lat and lng are required numeric parameters." });
    return;
  }

  if (radius <= 0 || radius > 2000) {
    res.status(400).json({ success: false, error: "radius must be between 1 and 2000 km." });
    return;
  }

  try {
    /**
     * Haversine formula in PostgreSQL:
     *
     *  distance_km = 6371 * acos(
     *    cos(radians($lat)) * cos(radians(latitude)) *
     *    cos(radians(longitude) - radians($lng)) +
     *    sin(radians($lat)) * sin(radians(latitude))
     *  )
     *
     * We filter WHERE distance_km < $radius to avoid full-table scan on large data,
     * then ORDER BY distance_km ASC.
     */
    const query = `
      SELECT
        id,
        name,
        "craftType"      AS craft,
        city,
        region,
        specialty,
        "whyUnique"      AS why_unique,
        "buyingOptions"  AS buying_options,
        "bharatScore"    AS bharat_score,
        latitude,
        longitude,
        ROUND(
          CAST(
            6371 * acos(
              GREATEST(-1, LEAST(1,
                cos(radians($1)) * cos(radians(latitude)) *
                cos(radians(longitude) - radians($2)) +
                sin(radians($1)) * sin(radians(latitude))
              ))
            ) AS numeric
          ), 1
        ) AS distance_km
      FROM "Artisan"
      WHERE
        latitude  IS NOT NULL AND
        longitude IS NOT NULL AND
        6371 * acos(
          GREATEST(-1, LEAST(1,
            cos(radians($1)) * cos(radians(latitude)) *
            cos(radians(longitude) - radians($2)) +
            sin(radians($1)) * sin(radians(latitude))
          ))
        ) <= $3
      ORDER BY distance_km ASC
      LIMIT $4;
    `;

    const { rows } = await pool.query(query, [lat, lng, radius, limit]);

    res.json({
      success:  true,
      userLat:  lat,
      userLng:  lng,
      radiusKm: radius,
      total:    rows.length,
      artisans: rows,
    });
  } catch (err) {
    console.error("Error in /api/artisans/nearby:", err);
    res.status(500).json({ success: false, error: "Internal server error while fetching nearby artisans." });
  }
});

/**
 * GET /api/artisans/cities
 * Returns all unique cities available in the artisan DB.
 */
router.get("/cities", async (_req: Request, res: Response): Promise<void> => {
  try {
    const { rows } = await pool.query(
      `SELECT DISTINCT city, COUNT(*) as artisan_count
       FROM "Artisan"
       WHERE city IS NOT NULL
       GROUP BY city
       ORDER BY city ASC`
    );
    res.json({ success: true, cities: rows });
  } catch (err) {
    console.error("Error in /api/artisans/cities:", err);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

export default router;
