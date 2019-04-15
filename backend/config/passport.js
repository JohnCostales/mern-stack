/*
Code taken from: "https://github.com/mikenicholson/passport-jwt"
*/

// Passport
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Library
const mongoose = require('mongoose')
const keys = require('../config/keys')

//Models
const User = mongoose.model('users')

// Options
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user)
                    }
                    return done(null, false)
                })
                .catch(err => console.log(err))
        })
    )
}