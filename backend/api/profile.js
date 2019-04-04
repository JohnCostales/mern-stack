// Library
const express = require('express')
const router = express.Router()

// @route GET api/profiles/test
// @desc Tests profiles routes
// @access Private
router.get('/test', (req, res) =>
    res.json({
        msg: "Test Profile"
    })) //Get json response

module.exports = router