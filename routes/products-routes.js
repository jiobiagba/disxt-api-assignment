const router = require("express").Router()
const ProductsController = require("../controller/products")
const roles = require("../utils/roles").roles
const tokenUtil = require("../utils/token-checker").tokenChecker

// General Routes
router.use("*", async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        const role = await tokenUtil(token)
        if( !roles.includes(role[0])) throw "Permission Denied - General Route"
        req.role = role[0]
        next()
    }
    catch (e) {
        return res.status(401).send({ error: true, message: e })
    }
})


router.get("/list-products", ProductsController.listProducts)
router.get("/list-one-by-id/:id", ProductsController.getProduct)



// Admin-Only Routes
router.use("*", async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if( !token) throw "Please provide token in authorization header"
        const role = await tokenUtil(token)
        if( role[0] !== "admin") throw "Permission Denied - Protected Route"
        req.role = role[0]
        req.adminId = role[1]
        next()
    }
    catch (e) {
        return res.status(401).send({ error: true, message: e })
    }
})

router.post("/add", ProductsController.createProduct)
router.put("/update-one-by-id/:id", ProductsController.updateProduct)
router.delete("/delete-one-by-id/:id", ProductsController.deleteProduct)

exports.ProductsRouter = router