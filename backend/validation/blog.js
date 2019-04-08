/*
    Documentation URL for Validator: 'https://github.com/chriso/validator.js/'
*/

const Validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validateBlogPost(data) {
    let errors = {};

    // Empty Data string
    data.title = !isEmpty(data.title) ? data.title : ''
    data.text = !isEmpty(data.text) ? data.text : ''
    data.preview = !isEmpty(data.preview) ? data.preview : ''

    // Validation
    if (!Validator.isLength(data.title, { min: 5, max: 70 })) {
        errors.title = 'Title must be between 5 and 70 characters'
    }
    if (!Validator.isLength(data.text, { min: 100 })) {
        errors.text = 'Blog must be minimum 100 characters'
    }
    if (!Validator.isLength(data.preview, { max: 130 })) {
        errors.preview = 'Preview must be a maximum of 130 characters'
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Blog post requires a title!'
    }
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Blog post requires content!'
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};
