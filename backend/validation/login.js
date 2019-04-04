/*
    Documentation URL for Validator: 'https://github.com/chriso/validator.js/'
*/

const validator = require('validator')
const isEmpty = require('lodash.isempty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    // Empty Data string
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    // Email Validation
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    // Password Validation
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}