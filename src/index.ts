import express from "express";
import dotenv from "dotenv"
import { identityRouter } from "./routes/identity.routes";
import { AppDataSource } from "./data-source";

dotenv.config()

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source initialized with better-sqlite3!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.use("/api/identify", identityRouter)

const PORT = Number(process.env.PORT) || 8000

app.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running on port ${PORT}`)
})