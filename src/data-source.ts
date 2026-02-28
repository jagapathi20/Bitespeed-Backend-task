import "reflect-metadata";
import { DataSource } from "typeorm";
import { Contact } from "./entities/contact"; 
import path from "path";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: process.env.DB_NAME || "database.sqlite",
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    entities: [Contact],
    migrations: [
        // This logic ensures Node doesn't try to read .ts files in production
        process.env.NODE_ENV === "production" 
            ? path.join(process.cwd(), "dist", "migration", "*.js") 
            : path.join(process.cwd(), "src", "migration", "*.ts")
    ],
    subscribers: [],
});