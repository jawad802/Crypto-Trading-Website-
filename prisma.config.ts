import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Explicitly load the .env file from your project root
config();

export default defineConfig({
    schema: "prisma/schema.prisma",
    datasource: {
        url: process.env.DATABASE_URL || "",
    },
});