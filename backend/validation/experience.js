/*
    Documentation URL for Validator: 'https://github.com/chriso/validator.js/'
*/

const Validator = require("validator")
const isEmpty = require("lodash.isempty")

// Experience
module.exports = function validateExperienceInput(data) {
    let errors = {}

    // Empty Data string
    data.title = !isEmpty(data.title) ? data.title : ""
    data.company = !isEmpty(data.company) ? data.company : ""
    data.starDate = !isEmpty(data.starDate) ? data.starDate : ""

    if (Validator.isEmpty(data.title)) {
        errors.title = "Job title field is required"
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = "Company field is required"
    }

    if (Validator.isEmpty(data.startDate)) {
        errors.startDate = "Start Date is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}