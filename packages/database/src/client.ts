import { PrismaClient } from "./generated/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prismaClient =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient;
