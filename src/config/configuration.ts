import * as dotenv from "dotenv";
import { join } from "path";

// Load .env file
dotenv.config();

export const configuration = {
  database: {
    type: process.env.DB_TYPE || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "zyad",
    name: process.env.DB_NAME || "sku_management",
  },
  app: {
    port: parseInt(process.env.PORT || "3000", 10),
    apiPrefix: process.env.API_PREFIX || "api",
    nodeEnv: process.env.NODE_ENV || "development",
  },
  typeorm: {
    synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    entities: process.env.TYPEORM_ENTITIES || "dist/**/*.entity.js",
    entitiesDir:
      process.env.TYPEORM_ENTITIES_DIR ||
      join(__dirname, "../shared/database/entities/*.entity.{ts,js}"),
  },
  swagger: {
    title: process.env.SWAGGER_TITLE || "SKU Management API",
    description:
      process.env.SWAGGER_DESCRIPTION ||
      "A comprehensive API for managing SKUs, stock, transfers, and reorder alerts",
    version: process.env.SWAGGER_VERSION || "1.0",
  },
};
