"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// ============================================================================
// STUDY NOTE: Prisma Client Singleton Pattern
// Instantiating PrismaClient once prevents exceeding DB connection pool limits
// during rapid reloading in local development mode.
// ============================================================================
exports.prisma = new client_1.PrismaClient();
//# sourceMappingURL=db.js.map