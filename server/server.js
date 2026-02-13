import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Needed for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dummy product data
const products = [
    { id: 1, name: "iPhone 15" },
    { id: 2, name: "Samsung Galaxy S23" },
    { id: 3, name: "MacBook Pro" },
    { id: 4, name: "Dell Laptop" }
];

// Serve React build
app.use(express.static(path.join(__dirname, "client/dist")));

// Product search API
app.get("/products", (req, res) => {
    const search = (req.query.search || "").toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search)
    );
    res.json(filtered);
});

// SPA fallback (important)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
