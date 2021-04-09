const vehicleModel = require("../model/vehicle");

exports.createNewVehicle = async (req, res) => {
  try {
    const create = await vehicleModel.createNewVehicle(req.body);
    if (create.affectedRows > 0) {
      const newVehicle = await vehicleModel.getVehicleById(create.insertId);
      return res.json({
        success: true,
        message: "Success create vehicle",
        result: newVehicle,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failed create vehicle",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getConditionVehicle = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = limit * (page - 1);
    const search = req.query.search || "";
    const sort = req.query.sort || "date";
    const order = req.query.order || "ASC";
    const filter = req.query.filter || "";

    const countVehicle = await vehicleModel.countVehicle({ search, filter });
    const totalItem = countVehicle[0].total;
    const totalPage = Math.ceil(totalItem / limit);
    if (totalPage >= page) {
      const vehicle = await vehicleModel.getConditionVehicle({
        limit,
        offset,
        search,
        sort,
        order,
        filter,
      });
      if (vehicle.length == 0) {
        return res.json({
          success: true,
          message: "Sorry data not found",
        });
      }
      return res.json({
        success: true,
        message: "Success get all vehicle",
        result: {
          page,
          limit,
          totalItem,
          totalPage,
          data: vehicle,
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

exports.updateVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await vehicleModel.updateVehicle(id, req.body);
    if (update.affectedRows > 0) {
      if (update.changedRows > 0) {
        const updateVehicle = await vehicleModel.getVehicleById(id);
        return res.json({
          success: true,
          message: "Success updated vehicle",
          result: updateVehicle,
        });
      }
      return res.status(400).json({
        success: false,
        message: "Data not change",
      });
    }
    return res.status(400).json({
      success: false,
      message: `Failed updated vehicle id ${id} not found`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    const vehicleById = await vehicleModel.getVehicleById(id);
    if (vehicleById.length == 0) {
      return res.status(404).json({
        success: false,
        message: `Vehicle with id ${id} not found`,
      });
    }
    await vehicleModel.deleteVehicle(id);
    return res.json({
      success: true,
      message: "Delete vehicle success",
      result: vehicleById,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
