const router = require("express").Router()
const UsersController = require("../controller/users")
const tokenUtil = require("../utils/token-checker").tokenChecker

router.post("/register", UsersController.registerUser)
router.post("/login", UsersController.logUserIn)

// Admin Access Required
router.use("*", async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if( !token) throw "Please provide token in authorization header"
        const role = await tokenUtil(token)
        if( role[0] !== "admin") throw "Permission Denied - Protected Route"
        next()
    }
    catch (e) {
        return res.status(401).send({ error: true, message: e })
    }
})

router.get("/list-users", UsersController.listUsers)
router.put("/update-user/:id", UsersController.updateUser)

exports.UsersRouter = router