const express = require("express");
const cors = require("cors");

require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/orders", orderRoutes);

app.listen(process.env.PORT, () => {

    console.log(

        `Order Service running on ${process.env.PORT}`

    );

});