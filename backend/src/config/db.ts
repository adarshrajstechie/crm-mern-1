import { PrismaClient } from '@prisma/client';

// ============================================================================
// STUDY NOTE: Prisma Client Singleton Pattern
// Instantiating PrismaClient once prevents exceeding DB connection pool limits
// during rapid reloading in local development mode.
// ============================================================================

export const prisma = new PrismaClient();