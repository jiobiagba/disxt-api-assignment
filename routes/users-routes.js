const router = require("express").Router()
const UsersController = require("../controller/users")

router.post("/register", UsersController.registerUser)
router.post("/login", UsersController.logUserIn)

exports.UsersRouter = router