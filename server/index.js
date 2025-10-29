import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS: keep tight for now (expand later if needed)
app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"] }));
app.use(express.json({ limit: "1mb" }));

// Health & hello
app.get("/", (_req, res) => {
    res.json({
        ok: true,
        name: "Campvue Chatbot POC",
        env: process.env.NODE_ENV || "development",
        uptime_s: Math.round(process.uptime()),
    });
});

// K8s-style healthz (handy later)
app.get("/healthz", (_req, res) => res.status(204).end());

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
