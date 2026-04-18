"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
async function run() {
    const lat = 13.1812; // Nitte
    const lng = 74.9348; // Nitte
    const query = `
      SELECT
        name, city, latitude, longitude,
        ROUND(
          CAST(
            6371 * acos(
              GREATEST(-1, LEAST(1,
                cos(radians($1)) * cos(radians(latitude)) *
                cos(radians(longitude) - radians($2)) +
                sin(radians($1)) * sin(radians(latitude))
              ))
          AS numeric), 1
        ) AS distance_km
      FROM "Artisan"
      WHERE city = 'Udupi';
  `;
    const { rows } = await pool.query(query, [lat, lng]);
    console.log("Distances:");
    console.log(rows);
    process.exit(0);
}
run();
