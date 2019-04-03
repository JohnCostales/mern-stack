const express = require('express')
const router = express.Router()

// @route GET api/users/test
// @desc Tests users routes
// @access Private

router.get('/test', (req, res) =>
    res.json({
        msg: "This users works"
    })) //Get json response

module.exports = router