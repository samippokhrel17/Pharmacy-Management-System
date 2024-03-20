"use strict";

module.exports = {
  createDoctor: require("./create_doctor_sql"),
  loginDoctorSql: require("./login_doctor_sql"),
  suggestMedicine: require("./suggest_medicine_customer"),
  getSuggestionPharmacy: require("./get_suggestion_list_pharmacy_sql"),
};
