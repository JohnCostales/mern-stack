/*
    Documentation URL for Validator: 'https://github.com/chriso/validator.js/'
*/

const Validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validatecomments(data) {
    let errors = {};

    // Empty Data string
    data.text = !isEmpty(data.text) ? data.text : ''

    // Validation
    if (!Validator.isLength(data.text, { max: 130 })) {
        errors.text = 'Comment must be a maximum 130 characters'
    }
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Blog post requires content!'
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};
