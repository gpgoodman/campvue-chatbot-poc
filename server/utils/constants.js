// Minimal gazetteers to start; easy to extend later.

export const STATES = {
    arizona: "Arizona",
    california: "California",
    colorado: "Colorado",
    nevada: "Nevada",
    newmexico: "New Mexico",
    idaho:"Idaho",
    montana: "Montana",
    oregon: "Oregon",
    utah: "Utah",
    washington: "Washington",
    wyoming: "Wyoming",
    // add more as you go (keep lowercase keys; collapse spaces e.g., "new york" -> "newyork")
};

export const PARK_TYPES = {
    "state park": "state",
    "state parks": "state",
    "national park": "national",
    "national parks": "national",
    "national forest": "national forest",
    "national forests": "national forest",
    "national monument": "national monument",
    "national monuments": "national monument",
    "blm": "blm",
};

export const AMENITY_FLAGS = [
    { key: "has_accessible", value: true, terms: ["accessible", "ada", "wheelchair", "barrier-free"] },
    { key: "has_tent_pads", value: true, terms: ["tent pad", "tent pads", "designated tent pad"] },
    { key: "has_showers", value: true, terms: ["showers", "shower"] },
    { key: "has_hookups", value: true, terms: ["hookups", "full hookups", "electric", "water/electric"] },
];

export const STOPWORDS = new Set([
    "find","show","me","a","an","the","some","with","and","or","near","in","on","at","to","for","please",
    "looking","look","want","i","of","that","which","park","parks","campground","campgrounds"
]);
