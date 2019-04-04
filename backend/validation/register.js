/*
    Documentation URL for Validator: 'https://github.com/chriso/validator.js/'
*/

const validator = require('validator')
const isEmpty = require('lodash.isempty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    // Empty Data string
    data.name = !isEmpty(data.name) ? data.name : ''
    data.username = !isEmpty(data.username) ? data.username : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.confPass = !isEmpty(data.confPass) ? data.confPass : ''

    // Name Validation
    if (!validator.isLength(data.name, {
        min: 2,
        max: 30
    })) {
        errors.name = 'Name must be between 2 and 30 character'
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    // Username Validation
    if (!validator.isLength(data.username, {
        min: 2,
        max: 30
    })) {
        errors.username = 'Username must be between 2 and 30 character'
    }
    if (validator.isEmpty(data.username)) {
        errors.username = 'Username field is required'
    }

    // Email Validation
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Email field is invalid'
    }

    // Password Validation
    if (!validator.isLength(data.password, {
        min: 6,
        max: 30
    })) {
        errors.password = 'Password must be at least 6 characters'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    // Confirm Password
    if (validator.isEmpty(data.confPass)) {
        errors.confPass = 'Please confirm your password'
    }
    if (!validator.equals(data.password, data.confPass)) {
        errors.confPass = 'Passwords must match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}