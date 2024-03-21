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
      console.error("Error at databaseHelper connection.init", error);
    }
  };

  // Defining a method 'executeQuery' to execute SQL queries
  connection.executeQuery = async (query, fields) => {
    try {
      let res = dbClient.query(query, fields);
      dbClient.query("commit");
      return res;
    } catch (error) {
      console.error("Error >>>>>>>>>>>>>>.", error);
      throw error;
    }
  };
  // format is used to safely format SQL queries with arguments.
  connection.format = (query, args) => {
    try {
      return dbClient.format(query, args);
    } catch (error) {
      console.error({}, "Error>>>>>>>>>>>>>>>>>", error);
      throw error;
    }
  };
})(module.exports);
