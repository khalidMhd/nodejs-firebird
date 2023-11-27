const firebird = require("node-firebird");
const dotenv = require("dotenv");
dotenv.config();
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  lowercase_keys: false,
  pageSize: 4096,
  role: null,
  charset: "WIN1253",
};

exports.executeQuery = async (query, params = []) => {
  return new Promise((resolve, reject) => {
    firebird.attach(options, (err, db) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("Connected to the Firebird database.");

      db.query(query, params, (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          reject(err);
        } else {
          console.log("Query executed successfully.");
          resolve(result);
        }

        db.detach();
      });
    });
  });
};
