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

app.use("/api/identity", identityRouter)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})