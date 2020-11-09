const express = require("express")

const router = express.Router();

const {createOrUpdateUser} = require("../controllers/auth")

router.get("/user", (req, res) => {
    res.json({
        data: "hit API endpoint"
    })
})

module.exports = router