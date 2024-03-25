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

      // Constructs a SQL query to fetch data from the database
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

      // Executes the constructed query and retrieves the result
      let [result] = await connection.executeQuery(query);

      // Checks if the query returned no results
      if (result && result.length <= 0) {
        return (response = {
          status: httpStatus.BAD_REQUEST,
          message: "customer doesnot exist!!!",
        });
      }
      // additional data based on above query result(medicine details to be sold)
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
    where p.mobile_number = "${result[0].mobile_number}"`; // Filters the results to only include rows where the mobile number in the doctor_suggestions table matches the mobile number fetched from the previous query result

      let [resultQuery] = await connection.executeQuery(queryMedicine);

      //  fetched medicine data to group and sort items
      //reduce() method to iterate over the fetched medicine data (resultQuery) and group items based on their medicine_name.
      const groupedItems = resultQuery.reduce((groups, item) => {
        const groupName = item.medicine_name;
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(item); //add the current item to the array representing the group of items associated with the current medicine name.
        return groups;
      }, {});
      // Sorts the grouped items by expiry date(JK dai twist)
      for (const groupName in groupedItems) {
        groupedItems[groupName].sort(
          (a, b) => new Date(a.expiry_date) - new Date(b.expiry_date)
        );
      }
      // get only first item from each group
      const sortedItems = Object.values(groupedItems).map((group) => group[0]);

      //send that sorted shorted medicine data to main result
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
