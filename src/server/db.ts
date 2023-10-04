import { PrismaClient } from "@prisma/client";

import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// console.log('globalForPrisma :>> ', globalForPrisma);
// console.log('globalForPrisma.prisma :>> ', globalForPrisma.prisma);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// console.log('db :>> ', db);

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
