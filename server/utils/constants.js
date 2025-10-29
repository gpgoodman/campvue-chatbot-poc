// Minimal gazetteers to start; easy to extend later.

export const STATES = {
    arizona: "AZ",
    california: "CA",
    colorado: "CO",
    nevada: "NV",
    newmexico: "NM",
    oregon: "OR",
    utah: "UT",
    washington: "WA",
    // add more as you go (keep lowercase keys; collapse spaces e.g., "new york" -> "newyork")
};

export const PARK_TYPES = {
    "state park": "state_park",
    "state parks": "state_park",
    "national park": "national_park",
    "national parks": "national_park",
    "national forest": "national_forest",
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
