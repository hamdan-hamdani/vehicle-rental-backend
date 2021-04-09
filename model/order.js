const db = require("../helper/db");

exports.createNewOrder = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO tb_order (${Object.keys(data)}) VALUES (${Object.values(data).map((item) => "'" + item + "'")})`, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM tb_order WHERE id = ${id}`, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.countOrder = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) as total  FROM tb_order WHERE orderDate LIKE '%${condition.search}%' `, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.getConditionOrder = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT *  FROM tb_order WHERE orderDate LIKE '%${condition.search}%' ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.updateOrder = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    db.query(`UPDATE tb_order SET ${keys.map((key, index) => `${key} = " ${values[index]} "`)} WHERE id = ${id} `, (err, result, field) => {
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

exports.deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM tb_order WHERE id = ${id} `, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};
