const customerModel = require("../model/customer");

exports.createNewCustomer = async (req, res) => {
  try {
    const create = await customerModel.createNewCustomer(req.body);
    if (create.affectedRows > 0) {
      const newCustomer = await customerModel.getCustomerById(create.insertId);
      return res.json({
        success: true,
        message: "Success create customer",
        result: newCustomer,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failed create customer",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getConditionCustomer = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = limit * (page - 1);
    const search = req.query.search || "";
    const sort = req.query.sort || "dateOfBirth";
    const order = req.query.order || "ASC";

    const countCustomer = await customerModel.countCustomer({ search });
    const totalItem = countCustomer[0].total;
    const totalPage = Math.ceil(totalItem / limit);
    if (totalPage >= page) {
      const customer = await customerModel.getConditionCustomer({
        limit,
        offset,
        search,
        sort,
        order,
      });
      return res.json({
        success: true,
        message: "Success get all customer",
        result: {
          page,
          limit,
          totalItem,
          totalPage,
          data: customer,
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

exports.updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await customerModel.updateCustomer(id, req.body);
    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updateCustomer = await customerModel.getCustomerById(id);
        return res.json({
          success: true,
          message: "Success updated customer",
          result: updateCustomer,
        });
      }
      return res.status(400).json({
        success: false,
        message: "Data not change",
      });
    }
    return res.status(400).json({
      success: false,
      message: `Failed updated customer id ${id} not found`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customerById = await customerModel.getCustomerById(id);
    if (customerById.length == 0) {
      return res.status(404).json({
        success: false,
        message: `Customer with id ${id} not found`,
      });
    }
    await customerModel.deleteCustomer(id);
    return res.json({
      success: true,
      message: "Delete customer success",
      result: customerById,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
