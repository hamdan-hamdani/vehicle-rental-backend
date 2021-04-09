const express = require("express");
const route = express.Router();

const orderController = require("../controller/order");

route.post("/", orderController.createNewOrder);
route.get("/", orderController.getConditionOrder);
route.put("/:id", orderController.updateOrder);
route.delete("/:id", orderController.deleteOrder);

module.exports = route;
