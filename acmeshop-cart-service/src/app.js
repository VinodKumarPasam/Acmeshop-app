const express = require("express");
const cors = require("cors");

console.log("1. Starting App");

const app = express();

app.use((req, res, next) => {
    console.log("🔥 Incoming:", req.method, req.url);
    next();
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("✅ Root route");
    res.send("Server OK");
});

app.get("/test", (req, res) => {
    console.log("✅ Test route");
    res.json({ message: "Working" });
});

const cartRoutes = require("./routes/cartRoutes");

app.use("/api/v1/cart", cartRoutes);

app.listen(3002, () => {
    console.log("🚀 Server Running on 3002");
});