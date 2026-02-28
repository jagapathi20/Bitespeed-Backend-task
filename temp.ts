import "reflect-metadata"
import express from "express";
import dotenv from "dotenv"
import { identityRouter } from "./routes/identity.routes";
import { AppDataSource } from "./data-source";

dotenv.config()

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.use("/api/identify", identityRouter)

const PORT = Number(process.env.PORT) || 8000

// 1. Initialize the Database first
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source initialized with better-sqlite3!");
        
        // 2. Only start listening AFTER the database is ready
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
        process.exit(1); // Exit if the DB fails to connect
    });