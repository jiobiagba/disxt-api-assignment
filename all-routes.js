const router = require("express").Router()
const UsersRouter = require("./routes/users-routes").UsersRouter
const ProductsRouter = require("./routes/products-routes").ProductsRouter

router.use("/users", UsersRouter)
router.use("/products", ProductsRouter)

exports.allRoutes = router