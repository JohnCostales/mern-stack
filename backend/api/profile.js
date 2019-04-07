

// Library
const express = require("express")
const router = express.Router()
const mognoose = require("mongoose")
const passport = require("passport")

// Validations
const validateProfileInput = require("../validation/profile")
const validateExperienceInput = require("../validation/profile")
const validateEducation = require("../validation/profile")

// Load Model
const Profile = require("../model/Profile")
const User = require("../model/UserAuth")

// @route GET api/profiles/test
// @desc Tests profiles routes
// @access Private
router.get("/test", (req, res) =>
  res.json({
    msg: "Test Profile"
  })
) //Get json response

// @route GET api/profile
// @desc Get request to current user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {}
    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user"
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route POST api/profile
// @desc Create or Update the user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    // Check the validations
    if (!isValid) {
      // Return the errors with 400 status
      return res.status(400).json(errors)
    }
    // Fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.status) profileFields.status = req.body.status
    // Skills must be split in to an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",")
    }
    if (req.body.github) profileFields.github = req.body.handle

    // Social
    profileFields.social = {}
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram

    // // Contact
    // profileFields.contact = {}
    // if (req.body.mobile) profileFields.contact.mobile = req.body.mobile
    // if (req.body.email) profileFields.contact.email = req.body.email

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile))
      } else {
        //Create

        // Check handler
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already existst"
            res.status(400).json(errors)
          }

          // Save
          new Profile(profileFields).save().then(profile => res.json(profile))
        })
      }
    })
  }
)

// @route GET api/profile/all
// @desc Get all profiles by handle
// @access Public
router.get('/all', (req, res) => {
  const errors = {}
  Profile.find()
    .populate('user', ['name', 'avatar', 'email'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles for this user'
        return res.json(404).json()
      }

      res.json(profiles)
    })
    .catch(err => res.status(404).json({ profile: '404. No profiles found' }))
})

// @route GET api/profile/:handle
// @desc Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {}

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar', 'email'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route GET api/profile/:user_id
// @desc Get profile by user ID
// @access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err => res.status(404).json({ profile: '404. User not found' }))
})

/*
---Experience---
*/

// @route POST api/profile/experience
// @desc Add experience fields
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body)

  // Check the validations
  if (!isValid) {
    // Return the errors with 400 status
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        current: req.body.current,
        description: req.body.description,
      }
      // Add to experience array
      // unshift to add at the beginning
      profile.experience.unshift(newExp)
      profile.save().then(profile => res.json(profile))
    })
})

// @route POST api/profile/experience
// @desc Add experience fields
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body)

  // Check the validations
  if (!isValid) {
    // Return the errors with 400 status
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        current: req.body.current,
        description: req.body.description,
      }
      // Add to experience array
      // unshift to add at the beginning
      profile.experience.unshift(newExp)
      profile.save().then(profile => res.json(profile))
    })
})

/*
---Education---
*/

// @route POST api/profile/education
// @desc Add education fields
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducation(req.body)

  // Check the validations
  if (!isValid) {
    // Return the errors with 400 status
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        current: req.body.current,
        description: req.body.description,
      }
      // Add to education array
      // unshift to add at the beginning
      profile.education.unshift(newEdu)
      profile.save().then(profile => res.json(profile))
    })
})

/*
---Contact---
*/

// @route POST api/profile/contact
// @desc Add contact fields
// @access Private
router.post('/contact', passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newContact = {
        mobile: req.body.mobile,
        email: req.body.email,
      }
      // Add to contact array
      // unshift to add at the beginning
      profile.contact.unshift(newContact)
      profile.save().then(profile => res.json(profile))
    })
})

module.exports = router