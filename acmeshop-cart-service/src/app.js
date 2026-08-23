const express = require("express");
const cors = require("cors");

const app = express();

app.use((req, res, next) => {
    console.log("🔥 Incoming:", req.method, req.url);
    next();
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server OK");
});
app.get("/health", (req, res) => {
    res.json({ status: "UP" });
});

const cartRoutes = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use("/api/v1/cart", cartRoutes);

// Centralized error handler
app.use(errorHandler);

app.listen(3002, () => {
    console.log("🚀 Server Running on 3002");
});