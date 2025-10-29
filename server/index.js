import express from "express";
import cors from "cors";
import "dotenv/config";
import { parseIntent } from "./utils/parseIntent.js";
import { searchCampgrounds } from "./db/searchCampgrounds.js";

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

app.post("/search", async (req, res) => {              // ← make handler async
    const { q = "", page = 1, pageSize = 20 } = req.body || {};
    if (!q || typeof q !== "string") {
        return res.status(400).json({ ok: false, error: "Body must include { q: string }" });
    }

    const parsed = parseIntent(q);
    const hasFilters = parsed?.filters && Object.keys(parsed.filters).length > 0;

    try {
        if (hasFilters) {
            const result = await searchCampgrounds(parsed.filters, { page, pageSize });
            return res.json({ ok: true, parsed, result });
        }
        return res.json({ ok: true, parsed, result: null });
    } catch (e) {
        return res.status(500).json({ ok: false, error: e.message, parsed });
    }
});

app.get("/healthz", (_req, res) => res.status(204).end());

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
