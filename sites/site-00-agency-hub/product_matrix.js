/**
 * Affiliate Product Matrix v1.0
 * High-Buy-Intent targeting for 12 niches.
 */
const PRODUCT_MATRIX = {
    gaming: [
        { name: "NVIDIA RTX 4090", keywords: ["Performance Audit", "Price Tracking", "Integrity Check"] },
        { name: "Steam Deck OLED", keywords: ["Hardware Audit", "Value Check", "2026 Performance"] },
        { name: "Elden Ring: Shadow of the Erdtree", keywords: ["Digital Key Integrity", "Price Comparison"] },
        { name: "Logitech G Pro X Superlight 2", keywords: ["Click Latency Audit", "Price Drop"] }
    ],
    vpn: [
        { name: "NordVPN", keywords: ["Encryption Integrity", "Leak Test Audit", "2026 Review"] },
        { name: "Surfshark", keywords: ["Multi-device Infrastructure", "Price-to-Value"] },
        { name: "ExpressVPN", keywords: ["Server Node Analysis", "Privacy Audit"] }
    ],
    saas: [
        { name: "Jasper AI", keywords: ["SEO Generation Utility", "Enterprise Value"] },
        { name: "Shopify", keywords: ["Infrastructure Scalability", "E-commerce Integrity"] },
        { name: "Canva Pro", keywords: ["Asset Value Audit", "Workflow Speed"] }
    ],
    travel: [
        { name: "Booking.com Genius", keywords: ["Reservation Integrity", "Price Parity Check"] },
        { name: "Airbnb Luxe", keywords: ["Villa Verification", "Security Audit"] }
    ],
    fashion: [
        { name: "Nike Air Max 2026", keywords: ["Authenticity Audit", "Market Scarcity"] },
        { name: "Patagonia Torrentshell", keywords: ["Durability Integrity", "Sustainable Value"] }
    ],
    fintech: [
        { name: "Revolut Metal", keywords: ["Transaction Integrity", "Fee Transparency Audit"] },
        { name: "Wise Business", keywords: ["Exchange Parity", "Speed Verification"] }
    ],
    pet: [
        { name: "Furbo 360 Dog Camera", keywords: ["Connectivity Integrity", "Smart Features Audit"] },
        { name: "Blue Buffalo Life Protection", keywords: ["Ingredient Transparency", "Value Check"] }
    ],
    wfh: [
        { name: "Herman Miller Aeron", keywords: ["Ergonomic Infrastructure", "Lifecycle Value"] },
        { name: "Apple Studio Display", keywords: ["Color Accuracy Audit", "Integrity Check"] }
    ],
    electronics: [
        { name: "iPhone 16 Pro Max", keywords: ["Hardware Benchmarks", "Depreciation Curve"] },
        { name: "Sony WH-1000XM5", keywords: ["ANC Integrity", "Audio Fidelity Audit"] }
    ],
    outdoor: [
        { name: "Garmin Fenix 7 Pro", keywords: ["GPS Precision Audit", "Battery Integrity"] },
        { name: "YETI Tundra 45", keywords: ["Thermal Retention Check", "Durability Value"] }
    ],
    smarthome: [
        { name: "Philips Hue Bridge", keywords: ["Ecosystem Connectivity", "Latency Audit"] },
        { name: "Ring Video Doorbell Pro 2", keywords: ["Security Integrity", "Night Vision Check"] }
    ],
    aiproductivity: [
        { name: "GoHighLevel", keywords: ["CRM Infrastructure", "Automation Integrity"] },
        { name: "Notion AI", keywords: ["Knowledge Graph Integrity", "Utility Audit"] }
    ]
};

module.exports = { PRODUCT_MATRIX };
