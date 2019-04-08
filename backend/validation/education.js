/*
    Documentation URL for Validator: 'https://github.com/chriso/validator.js/'
*/

const Validator = require("validator")
const isEmpty = require("lodash.isempty")

module.exports = function validateEducation(data) {
    let errors = {}

    // Empty Data string
    data.school = !isEmpty(data.school) ? data.school : ""
    data.degree = !isEmpty(data.degree) ? data.degree : ""
    data.starDate = !isEmpty(data.starDate) ? data.starDate : ""

    if (Validator.isEmpty(data.school)) {
        errors.school = "Institution field is required"
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = "Degree field is required"
    }

    if (Validator.isEmpty(data.startDate)) {
        errors.startDate = "Start Date is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}