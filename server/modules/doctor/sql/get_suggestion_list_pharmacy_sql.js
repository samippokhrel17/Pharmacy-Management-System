"use strict";
const { connection } = require("../../../helpers");
const httpStatus = require("http-status");
const hashHelper = require("./../helper/hashHelper");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      let query = await connection.format(` 
  SELECT DISTINCT
    CONCAT(cu.firstName, ' ', cu.lastName) AS customerName,
    sg.mobile_number,
    CONCAT(doc.firstName, ' ', doc.lastName) AS doctorFullName,
    doc.email AS doctorEmail
FROM
    Pharmacy.doctor_suggestions AS sg
        LEFT JOIN
    Pharmacy.customer AS cu ON cu.contact = sg.mobile_number
        LEFT JOIN
    Pharmacy.doctor AS doc ON doc.doctor_id = sg.doctor_id
WHERE
    sg.mobile_number = "${req.mobileNumber}";
    



   `);
      let [result] = await connection.executeQuery(query);
      if (result && result.length <= 0) {
        return (response = {
          status: httpStatus.BAD_REQUEST,
          message: "customer doesnot exist!!!",
        });
      }

      const queryMedicine = `
  SELECT 
    m.medicine_id,
    m.medicine_name,
    p.mobile_number,
    m.expiry_date,
      p.quantity_given as suggestedMedQuantity
FROM
    Pharmacy.doctor_suggestions AS p
        INNER JOIN
    Pharmacy.medicine AS m ON m.medicine_name= p.medicine_name
    where p.mobile_number = "${result[0].mobile_number}"`;

      let [resultQuery] = await connection.executeQuery(queryMedicine);
      const groupedItems = resultQuery.reduce((groups, item) => {
        const groupName = item.medicine_name;
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(item);
        return groups;
      }, {});

      for (const groupName in groupedItems) {
        groupedItems[groupName].sort(
          (a, b) => new Date(a.expiry_date) - new Date(b.expiry_date)
        );
      }

      const sortedItems = Object.values(groupedItems).map((group) => group[0]);

      result[0].medicine_name = sortedItems;

      if (result && result.length > 0) {
        return (response = {
          status: httpStatus.OK,
          message: "suggestion noted sucessfully!!!",
          data: result,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" }); // Use 'return' to exit the function
    }
  };
})();
