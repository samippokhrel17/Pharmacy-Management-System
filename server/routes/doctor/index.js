"use strict";

module.exports = {
  registerDoctor: require("./../../modules/doctor/methods/create_doctor"),
  loginDoctorSql: require("./../../modules/doctor/methods/login_doctor"),
  referMedicine: require("../../modules/customer/methods/update_customer"),
  suggestDoctor: require("./../../modules/doctor/methods/suggest_medicine_customer"),
  getSuggestionPharmacy: require("./../../modules/doctor/methods/get_suggestion_list_pharmacy"),
  soldMedicineCustomer: require("./../../modules/doctor/methods/sold_medicine_customer"),
};
