/*
    Documentation URL for Validator: 'https://github.com/chriso/validator.js/'
*/

const Validator = require("validator")
const isEmpty = require("lodash.isempty")

module.exports = function validateProfileInput(data) {
  let errors = {}

  // Empty Data string
  data.handle = !isEmpty(data.handle) ? data.handle : ""
  data.status = !isEmpty(data.status) ? data.status : ""
  data.skills = !isEmpty(data.skills) ? data.skills : ""

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle neeeds to be between 2 and 4 characters"
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required"
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required"
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required"
  }

  // Check website is a URL
  // First 'if' statement allows empty data to be valid
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL"
    }
  }

  // Check if valid URL for social media
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL"
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL"
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL"
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL"
    }
  }

  // if (!isEmpty(data.email)) {
  //   if (!Validator.isEmail(data.email)) {
  //     errors.email = "Email field is invalid";
  //   }
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

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