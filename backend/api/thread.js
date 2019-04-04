// Library
const express = require('express')
const router = express.Router()

// @route GET api/thread/test
// @desc Tests thread routes
// @access Public
router.get('/test', (req, res) =>
    res.json({
        msg: "This thread works"
    })) //Get json response

module.exports = router