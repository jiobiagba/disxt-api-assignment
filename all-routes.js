const router = require("express").Router()
const UsersRouter = require("./routes/users-routes").UsersRouter

router.use("/users", UsersRouter)

exports.allRoutes = router