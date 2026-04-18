"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const morgan_1 = __importDefault(require("morgan"));
const onboardingRoute_1 = __importDefault(require("../routes/onboardingRoute"));
const artisansRoute_1 = __importDefault(require("../routes/artisansRoute"));
const growthOsRoute_1 = __importDefault(require("../routes/growthOsRoute"));
const shoppingRoute_1 = __importDefault(require("../routes/shoppingRoute"));
const app = (0, express_1.default)();
// ── Security & Production Middlewares ──
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
// ── Rate Limiting ──
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200, // Slightly higher for general api
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);
// ── CORS ──
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // Defaults to wildcard; specify domains via ENV
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// ── Routes ──
app.use('/api/onboarding', onboardingRoute_1.default);
app.use('/api/artisans', artisansRoute_1.default);
app.use('/api/growth-os', growthOsRoute_1.default);
app.use('/api/shopping', shoppingRoute_1.default);
// ── Global Error Handler ──
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error: ', err.message);
    res.status(500).json({ error: "Internal Server Error" });
});
// ── Listen ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
