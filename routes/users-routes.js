const router = require("express").Router()
const UsersController = require("../controller/users")

router.post("/register", UsersController.registerUser)
router.post("/login", UsersController.logUserIn)
router.get("/list-users", UsersController.listUsers)
router.put("/update-user/:id", UsersController.updateUser)

exports.UsersRouter = router