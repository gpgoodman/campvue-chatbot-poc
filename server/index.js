import express from "express";
import cors from "cors";
import "dotenv/config";
import { parseIntent } from "./utils/parseIntent.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"] }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
    res.json({
        ok: true,
        name: "Campvue Chatbot POC",
        env: process.env.NODE_ENV || "development",
        uptime_s: Math.round(process.uptime()),
    });
});

app.post("/search", (req, res) => {
    const q = (req.body && req.body.q) || "";
    if (!q || typeof q !== "string") {
        return res.status(400).json({ ok: false, error: "Body must include { q: string }" });
    }
    const parsed = parseIntent(q);
    res.json({ ok: true, ...parsed });
});

app.get("/healthz", (_req, res) => res.status(204).end());

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
