// Import Express
const express = require("express");
const cors = require("cors");


// Create Express App
const app = express();
app.use(
  cors({
    origin: "http://localhost"
  })
);

// Import Routes
const productRoutes = require("./routes/productRoutes");

// Middleware to parse JSON body
app.use(express.json());


// Register Product Routes
app.use(
  "/api/v1/products",
  productRoutes
);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "UP"
  });
});

// Start Server
app.listen(3001, () => {
  console.log(
    "Product Service running on port 3001"
  );
});