// Library
const express = require("express");
const router = express.Router();
const mognoose = require("mongoose");
const passport = require("passport");

// Validations
const validateProfileInput = require("../validation/profile");

// Load Model
const Profile = require("../model/Profile");
const User = require("../model/UserAuth");

// @route GET api/profiles/test
// @desc Tests profiles routes
// @access Private
router.get("/test", (req, res) =>
  res.json({
    msg: "Test Profile"
  })
); //Get json response

// @route GET api/profile
// @desc Get request to current user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile
// @desc Create or Update the user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check the validations
    if (!isValid) {
      // Return the errors with 400 status
      return res.status(400).json(errors);
    }
    // Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    // Skills must be split in to an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    if (req.body.github) profileFields.github = req.body.handle;

    // Social
    profileFields.social = {};
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create

        // Check handler
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already existst";
            res.status(400).json(errors);
          }

          // Save
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
module.exports = router;
