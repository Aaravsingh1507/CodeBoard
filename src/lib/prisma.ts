import { PrismaClient } from "@prisma/client";
import fs from "fs";

// Prevent creating a new PrismaClient on every hot-reload in dev.
const globalForPrisma = globalThis as unknown as {
    prisma?: any;
};

// SQL statements to create all tables (mirrors prisma/schema.prisma).
const INIT_SQL = `
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
    "githubId" TEXT,
      "githubUsername" TEXT,
        "leetcodeUsername" TEXT,
          "name" TEXT,
            "email" TEXT,
              "emailVerified" DATETIME,
                "image" TEXT,
                  "avatarUrl" TEXT,
                    "targetRole" TEXT,
                      "targetCompanies" TEXT,
                        "jobSearchStatus" TEXT DEFAULT 'not_looking',
                          "githubAccessToken" TEXT,
                            "onboarded" BOOLEAN NOT NULL DEFAULT false,
                              "theme" TEXT NOT NULL DEFAULT 'dark',
                                "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  "updatedAt" DATETIME NOT NULL,
                                    "githubStatsCache" TEXT,
                                      "githubStatsSyncedAt" DATETIME,
                                        "leetcodeStatsCache" TEXT,
                                          "leetcodeStatsSyncedAt" DATETIME
                                          );
                                          CREATE UNIQUE INDEX IF NOT EXISTS "User_githubId_key" ON "User"("githubId");
                                          CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

                                          CREATE TABLE IF NOT EXISTS "Account" (
                                            "id" TEXT NOT NULL PRIMARY KEY,
                                              "userId" TEXT NOT NULL,
                                                "type" TEXT NOT NULL,
                                                  "provider" TEXT NOT NULL,
                                                    "providerAccountId" TEXT NOT NULL,
                                                      "refresh_token" TEXT,
                                                        "access_token" TEXT,
                                                          "expires_at" INTEGER,
                                                            "token_type" TEXT,
                                                              "scope" TEXT,
                                                                "id_token" TEXT,
                                                                  "session_state" TEXT,
                                                                    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
                                                                    );
                                                                    CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

                                                                    CREATE TABLE IF NOT EXISTS "Session" (
                                                                      "id" TEXT NOT NULL PRIMARY KEY,
                                                                        "sessionToken" TEXT NOT NULL,
                                                                          "userId" TEXT NOT NULL,
                                                                            "expires" DATETIME NOT NULL,
                                                                              CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
                                                                              );
                                                                              CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");

                                                                              CREATE TABLE IF NOT EXISTS "VerificationToken" (
                                                                                "identifier" TEXT NOT NULL,
                                                                                  "token" TEXT NOT NULL,
                                                                                    "expires" DATETIME NOT NULL
                                                                                    );
                                                                                    CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token");
                                                                                    CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

                                                                                    CREATE TABLE IF NOT EXISTS "ActivityLog" (
                                                                                      "id" TEXT NOT NULL PRIMARY KEY,
                                                                                        "userId" TEXT NOT NULL,
                                                                                          "date" DATETIME NOT NULL,
                                                                                            "githubContributions" INTEGER NOT NULL DEFAULT 0,
                                                                                              "leetcodeSubmissions" INTEGER NOT NULL DEFAULT 0,
                                                                                                CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
                                                                                                );
                                                                                                CREATE UNIQUE INDEX IF NOT EXISTS "ActivityLog_userId_date_key" ON "ActivityLog"("userId", "date");
                                                                                                CREATE INDEX IF NOT EXISTS "ActivityLog_userId_date_idx" ON "ActivityLog"("userId", "date");

                                                                                                CREATE TABLE IF NOT EXISTS "ResumeVersion" (
                                                                                                  "id" TEXT NOT NULL PRIMARY KEY,
                                                                                                    "userId" TEXT NOT NULL,
                                                                                                      "fileUrl" TEXT NOT NULL,
                                                                                                        "fileName" TEXT NOT NULL,
                                                                                                          "label" TEXT NOT NULL,
                                                                                                            "notes" TEXT,
                                                                                                              "isActive" BOOLEAN NOT NULL DEFAULT false,
                                                                                                                "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                                                  CONSTRAINT "ResumeVersion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
                                                                                                                  );
                                                                                                                  
                                                                                                                  CREATE TABLE IF NOT EXISTS "Application" (
                                                                                                                    "id" TEXT NOT NULL PRIMARY KEY,
                                                                                                                      "userId" TEXT NOT NULL,
                                                                                                                        "company" TEXT NOT NULL,
                                                                                                                          "role" TEXT NOT NULL,
                                                                                                                            "link" TEXT,
                                                                                                                              "status" TEXT NOT NULL DEFAULT 'wishlist',
                                                                                                                                "appliedAt" DATETIME,
                                                                                                                                  "notes" TEXT,
                                                                                                                                    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                      "updatedAt" DATETIME NOT NULL,
                                                                                                                                        CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
                                                                                                                                        );
                                                                                                                                        
                                                                                                                                        CREATE TABLE IF NOT EXISTS "WeeklyReview" (
                                                                                                                                          "id" TEXT NOT NULL PRIMARY KEY,
                                                                                                                                            "userId" TEXT NOT NULL,
                                                                                                                                              "weekStart" DATETIME NOT NULL,
                                                                                                                                                "weekEnd" DATETIME NOT NULL,
                                                                                                                                                  "summaryText" TEXT NOT NULL,
                                                                                                                                                    "observations" TEXT NOT NULL,
                                                                                                                                                      "suggestions" TEXT NOT NULL,
                                                                                                                                                        "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                                          CONSTRAINT "WeeklyReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
                                                                                                                                                          );
                                                                                                                                                          CREATE UNIQUE INDEX IF NOT EXISTS "WeeklyReview_userId_weekStart_key" ON "WeeklyReview"("userId", "weekStart");
                                                                                                                                                          
                                                                                                                                                          CREATE TABLE IF NOT EXISTS "Goal" (
                                                                                                                                                            "id" TEXT NOT NULL PRIMARY KEY,
                                                                                                                                                              "userId" TEXT NOT NULL,
                                                                                                                                                                "type" TEXT NOT NULL,
                                                                                                                                                                  "label" TEXT NOT NULL,
                                                                                                                                                                    "target" INTEGER NOT NULL,
                                                                                                                                                                      "current" INTEGER NOT NULL DEFAULT 0,
                                                                                                                                                                        "deadline" DATETIME NOT NULL,
                                                                                                                                                                          "status" TEXT NOT NULL DEFAULT 'in_progress',
                                                                                                                                                                            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                                                              CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
                                                                                                                                                                              );
                                                                                                                                                                              `;

let initPromise: Promise<any> | null = null;

function initializeDatabase(client: PrismaClient) {
    const url = process.env.DATABASE_URL || "file:./dev.db";
    if (!url.includes("/tmp/")) {
          return Promise.resolve();
    }

  if (!initPromise) {
        const dbPath = url.replace("file:", "");
        if (!fs.existsSync(dbPath)) {
                try {
                          fs.writeFileSync(dbPath, ""); // Create empty file
                } catch (e) {
                          console.error("Failed to create /tmp db file", e);
                }
        }

      // Execute initialization queries and store the promise
      initPromise = client.$executeRawUnsafe(INIT_SQL)
          .then(() => {
                    console.log("Database initialized successfully with INIT_SQL");
          })
          .catch((err) => {
                    console.error("Failed to execute INIT_SQL", err);
                    initPromise = null; // reset to allow retry
                         throw err;
          });
  }
    return initPromise;
}

function createPrismaClient() {
    const url = process.env.DATABASE_URL || "file:./dev.db";

  const baseClient = new PrismaClient({
        datasources: {
                db: {
                          url,
                },
        },
  });

  // Extend the client to intercept all operations and ensure DB is initialized first
  const extendedClient = baseClient.$extends({
        query: {
                $allOperations({ args, query }) {
                          return initializeDatabase(baseClient).then(() => query(args));
                },
        },
  });

  return extendedClient;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
