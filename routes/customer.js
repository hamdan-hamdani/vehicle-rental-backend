const express = require("express");
const route = express.Router();

const customerController = require("../controller/customer");

route.post("/", customerController.createNewCustomer);
route.get("/", customerController.getConditionCustomer);
route.put("/:id", customerController.updateCustomer);
route.delete("/:id", customerController.deleteCustomer);

module.exports = route;
