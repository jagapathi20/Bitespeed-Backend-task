import "reflect-metadata";
import { DataSource } from "typeorm";
import { Contact } from "./entities/contact"; 
import path from "path";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: path.join(process.cwd(), process.env.DB_NAME || "database.sqlite"),
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    entities: [Contact],
    migrations: [
    process.env.NODE_ENV === "production" 
        ? path.join(__dirname, "migration", "*.js") 
        : path.join(__dirname, "migration", "*.ts")
    ],
    subscribers: [],
});