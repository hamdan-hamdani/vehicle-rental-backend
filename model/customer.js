const db = require("../helper/db");

exports.createNewCustomer = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO customer (${Object.keys(data)}) VALUES (${Object.values(data).map((item) => "'" + item + "'")})`, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.getCustomerById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM customer WHERE id = ${id}`, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.countCustomer = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(*) as total  FROM customer WHERE name LIKE '%${condition.search}%' `, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.getConditionCustomer = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT *  FROM customer WHERE name LIKE '%${condition.search}%' ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};

exports.updateCustomer = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    db.query(`UPDATE customer SET ${keys.map((key, index) => `${key} = " ${values[index]} "`)} WHERE id = ${id} `, (err, result, field) => {
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

exports.deleteCustomer = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM customer WHERE id = ${id} `, (err, result, field) => {
      if (err) {
        return reject(new Error(err));
      }
      return resolve(result);
    });
  });
};
