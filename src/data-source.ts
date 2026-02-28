import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: process.env.DB_NAME || "database.sqlite",
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    entities: [
        process.env.NODE_ENV === "production" 
            ? "dist/entities/*.js" 
            : "src/entities/*.ts"
    ],
    migrations: [
        process.env.NODE_ENV === "production" 
            ? "dist/migration/*.js" 
            : "src/migration/*.ts"
    ],
    subscribers: [],
});