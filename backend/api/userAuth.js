const express = require('express')
const router = express.Router()

// @route GET api/authentication/test
// @desc Tests authetication route
// @access Public

//Get json response
router.get('/test', (req, res) =>
    res.json({
        msg: "This Route works"
    })) //Get json response

module.exports = router
