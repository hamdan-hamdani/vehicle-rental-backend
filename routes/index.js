const express = require("express");
const route = express.Router();
const vehicleRouter = require("./vehicle");
const customerRouter = require("./customer");
const orderRouter = require("./order");

route.get("/", (req, res, next) => {
  res.json({ success: true, message: "This is api for Vehicle Rental" });
});

route.use("/vehicle", vehicleRouter);
route.use("/customer", customerRouter);
route.use("/order", orderRouter);

route.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Wrong url, please check documentation",
  });
});

module.exports = route;
