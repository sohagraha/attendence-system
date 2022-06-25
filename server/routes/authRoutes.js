const router = require('express').Router()
const { registerController, loginController } = require("../controller/authController")

router.post('/register', registerController)

router.post('/login', loginController)

module.exports = router;