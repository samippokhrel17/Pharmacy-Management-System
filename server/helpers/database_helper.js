"use-strict";
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();
((connection) => {
  let dbClient = null;

  connection.init = async () => {
    try {
      if (!dbClient) {
        dbClient = mysql.createPool({
          host: "localhost",
          user: "root",
          password: "1234",
          database: "Pharmacy",
        });
        console.log("MySQL connection pool initialized successfully!");
      }
      return dbClient;
    } catch (error) {
      const newLocal = "Error >>>>>>>>>>>>>.";
      console.error(newLocal, error);
      throw error;
    }
  };

  connection.query = async (query, fields) => {
    try {
      let res = dbClient.query(query, fields);
      dbClient.query("commit");
      return res;
    } catch (error) {
      console.error("Error >>>>>>>>>>>>>>.", error);
      throw error;
    }
  };

  connection.format = (query, args) => {
    try {
      return dbClient.format(query, args);
    } catch (error) {
      console.error({}, "Error>>>>>>>>>>>>>>>>>", error);
      throw error;
    }
  };

  // ... (rest of the functions) ...
})(module.exports);
