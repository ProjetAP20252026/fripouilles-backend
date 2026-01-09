import { config } from "dotenv";
import { resolve } from "path";
import { defineConfig } from "prisma/config";

// Charger explicitement le fichier .env
config({ path: resolve(__dirname, ".env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://fripouilles:fripouilles@localhost:5433/fripouilles?sslmode=disable",
  },
});
