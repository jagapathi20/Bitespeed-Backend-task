import "reflect-metadata";
import { DataSource } from "typeorm";
import { Contact } from "./entities/contact"; 

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: process.env.DB_NAME || "database.sqlite",
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    entities: [Contact], // 2. Use the Class directly
    migrations: [
        process.env.NODE_ENV === "production" 
            ? "dist/migration/*.js" 
            : "src/migration/*.ts"
    ],
    subscribers: [],
});