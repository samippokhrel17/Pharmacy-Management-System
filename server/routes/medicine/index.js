"use strict";

module.exports = {
  registerMedicines: require("./../../modules/medicines/methods/create_medicine_pharmacy"),
  getMedicineInformation: require("./../../modules/medicines/methods/get_medicine_information"),
  getMedicineInformationSqlById: require("./../../modules/medicines/methods/get_medicine_information_byID"),
};
