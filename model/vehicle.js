const db = require("../helper/db");

exports.createNewVehicle = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO vehicle (${Object.keys(data)}) VALUES (${Object.values(data).map((item) => "'" + item + "'")})`, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.getVehicleById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM vehicle WHERE id = ${id}`, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.countVehicle = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) as total  FROM vehicle INNER JOIN category_detail ON vehicle.category = category_detail.id WHERE vehicle.name LIKE '%${condition.search}%' AND category_detail.nameCategory LIKE '%${condition.filter}%' `,
      (err, result, field) => {
        if (err) {
          return reject(new Error(err));
        }
        return resolve(result);
      }
    );
  });
};

exports.getConditionVehicle = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *, category_detail.nameCategory FROM vehicle INNER JOIN category_detail ON vehicle.category = category_detail.id WHERE vehicle.name LIKE '%${condition.search}%' AND category_detail.nameCategory LiKE '%${condition.filter}%' ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`,
      (err, result, field) => {
        if (err) {
          return reject(new Error(err));
        }
        return resolve(result);
      }
    );
  });
};

exports.updateVehicle = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    db.query(`UPDATE vehicle SET ${keys.map((key, index) => `${key} = " ${values[index]} "`)} WHERE id = ${id} `, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

// exports.getAllProducts = () => {
//   return new Promise((resolve, reject) => {
//     db.query("SELECT *  FROM products", (err, result, field) => {
//       if (err) {
//         return reject(new Error(err));
//       }
//       return resolve(result);
//     });
//   });
// };

exports.deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM vehicle WHERE id = ${id} `, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};
