import { STATES, PARK_TYPES, AMENITY_FLAGS, STOPWORDS } from "./constants.js";

function preprocess(input) {
    return input
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, " ")  // strip punctuation/emojis
        .replace(/\s+/g, " ")
        .trim();
}

function squashSpaces(str) {
    return str.replace(/\s+/g, "");
}

export function parseIntent(userText) {
    const raw = String(userText ?? "");
    const text = preprocess(raw);

    const filters = {
        state: null,
        park_type: null,          // array later if multiple
        // amenity flags added dynamically
    };
    let residue = text;

    // --- STATES (handle "state of X" and plain "utah") ---
    for (const stateName in STATES) {
        const human = stateName.replace(/([a-z])([A-Z])/g, "$1 $2");
        const patterns = [
            `\\b${stateName}\\b`,
            `\\b${human}\\b`,
            `\\bstate of\\s+${human}\\b`,
        ];
        const re = new RegExp(patterns.join("|"), "i");
        if (re.test(residue)) {
            filters.state = STATES[stateName];
            residue = residue.replace(re, " ");
            break; // prefer first match
        }
    }

    // --- PARK TYPES ---
    const parkTypes = new Set();
    for (const phrase in PARK_TYPES) {
        const re = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
        if (re.test(residue)) {
            parkTypes.add(PARK_TYPES[phrase]);
            residue = residue.replace(re, " ");
        }
    }
    if (parkTypes.size) filters.park_type = Array.from(parkTypes);

    // --- AMENITY FLAGS (+ synonyms) ---
    for (const { key, value, terms } of AMENITY_FLAGS) {
        const re = new RegExp(`\\b(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "i");
        if (re.test(residue)) {
            filters[key] = value;
            residue = residue.replace(re, " ");
        }
    }

    // --- Residue (semantic hint) ---
    const words = residue.split(/\s+/).filter(Boolean);
    const filtered = words.filter(w => !STOPWORDS.has(w));
    const semanticQuery = filtered.join(" ").trim();

    return { filters, semanticQuery, original: raw };
}
