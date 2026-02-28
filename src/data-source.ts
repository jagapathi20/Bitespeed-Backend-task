import "reflect-metadata";
import { DataSource } from "typeorm";
import { Contact } from "./entities/contact"; 
import path from "path"; // Import path

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: process.env.DB_NAME || "database.sqlite",
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    entities: [Contact],
    migrations: [
        // Using path.join with process.cwd() is the most reliable way on Render
        process.env.NODE_ENV === "production" 
            ? path.join(process.cwd(), "dist", "migration", "*.js") 
            : path.join(process.cwd(), "src", "migration", "*.ts")
    ],
    subscribers: [],
});