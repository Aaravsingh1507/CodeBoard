import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

// Only use the `ws` package in Node.js environments where the native
// WebSocket API isn't available. Vercel serverless (and modern Node 22+)
// provide a global WebSocket, so importing `ws` there causes bundling
// issues or is simply unnecessary.
if (typeof WebSocket === "undefined") {
  // Dynamic require keeps `ws` out of the serverless bundle entirely.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  neonConfig.webSocketConstructor = require("ws");
}

// Create a non-pooling or pooling connection based on the URL available
const connectionString = `${process.env.POSTGRES_URL}`;

const adapter = new PrismaNeon({ connectionString });

// Prevent creating a new PrismaClient on every hot-reload in dev.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
