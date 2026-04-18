"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = require("express");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const router = (0, express_1.Router)();
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
// @ts-ignore - Ignore generic type cache validation
const prisma = new client_1.PrismaClient({ adapter });
router.post("/", async (req, res) => {
    try {
        const { clerkUserId, persona, name, phone, email, state: stateLocation, // Extracted from formData
        craft, experience, giTag, shopName, gst, inventory, factoryName, sector, capacity, brandName, tagline, inception } = req.body;
        // Create the generic onboarding record
        // @ts-ignore - Prisma client needs IDE restart to recognize newly generated models
        const request = await prisma.onboardingRequest.create({
            data: {
                clerkUserId,
                persona,
                name,
                phone,
                email,
                stateLocation,
                // Artisan specifics
                craftType: craft,
                experience: experience ? String(experience) : null,
                giTag,
                // Shop Owner specifics
                shopName,
                gstNumber: gst,
                inventoryType: inventory,
                // Manufacturer specifics
                factoryName,
                sector,
                capacity,
                // Brand specifics
                brandName,
                tagline,
                inceptionYear: inception ? String(inception) : null
            }
        });
        res.status(201).json({ success: true, data: request });
    }
    catch (error) {
        console.error("Error creating onboarding request:", error);
        res.status(500).json({ success: false, error: "Failed to submit onboarding request." });
    }
});
exports.default = router;
