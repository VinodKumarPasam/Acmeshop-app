const express = require("express");
const cors = require("cors");

require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "UP" });
});

app.use("/api/v1/orders", orderRoutes);

// Centralized error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {

    console.log(

        `Order Service running on ${process.env.PORT}`

    );

});