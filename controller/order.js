const orderModel = require("../model/order");

exports.createNewOrder = async (req, res) => {
  try {
    const create = await orderModel.createNewOrder(req.body);
    if (create.affectedRows > 0) {
      const newOrder = await orderModel.getOrderById(create.insertId);
      return res.json({
        success: true,
        message: "Success create order",
        result: newOrder,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failed create order",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getConditionOrder = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = limit * (page - 1);
    const search = req.query.search || "";
    const sort = req.query.sort || "dateOfBirth";
    const order = req.query.order || "ASC";

    const countOrder = await orderModel.countOrder({ search });
    const totalItem = countOrder[0].total;
    const totalPage = Math.ceil(totalItem / limit);
    if (totalPage >= page) {
      const orderResult = await orderModel.getConditionOrder({
        limit,
        offset,
        search,
        sort,
        order,
      });
      return res.json({
        success: true,
        message: "Success get all order",
        result: {
          page,
          limit,
          totalItem,
          totalPage,
          data: orderResult,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await orderModel.updateOrder(id, req.body);
    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updateOrder = await orderModel.getOrderById(id);
        return res.json({
          success: true,
          message: "Success updated order",
          result: updateOrder,
        });
      }
      return res.status(400).json({
        success: false,
        message: "Data not change",
      });
    }
    return res.status(400).json({
      success: false,
      message: `Failed updated order id ${id} not found`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orderById = await orderModel.getOrderById(id);
    if (orderById.length == 0) {
      return res.status(404).json({
        success: false,
        message: `Order with id ${id} not found`,
      });
    }
    await orderModel.deleteOrder(id);
    return res.json({
      success: true,
      message: "Delete order success",
      result: orderById,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
