const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const orderController = require("../controllers/orderController");

router.post(

    "/",

    authenticate,

    orderController.checkout

);

router.get(

    "/",

    authenticate,

    orderController.getOrders

);

module.exports = router;