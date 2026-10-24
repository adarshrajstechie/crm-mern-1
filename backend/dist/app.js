"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const db_1 = require("./config/db"); // Import prisma to test connection
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
    credentials: true
}));
app.use(express_1.default.json());
// API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/customers', customerRoutes_1.default);
// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        // Try a quick query to verify DB connection
        await db_1.prisma.$runCommandRaw({ ping: 1 });
        res.status(200).json({ status: 'OK', database: 'Connected' });
    }
    catch (error) {
        res.status(500).json({ status: 'Error', database: 'Disconnected', details: error });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`⚡ Server running on http://localhost:${PORT}`);
    // Test database connection on startup
    try {
        await db_1.prisma.$connect();
        console.log('✅ Successfully connected to MongoDB via Prisma');
    }
    catch (error) {
        console.error('❌ FATAL: Failed to connect to MongoDB.');
        console.error('Check your .env DATABASE_URL and MongoDB Atlas IP Whitelist.');
        console.error(error);
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map