const router = require("express").Router()
const ProductsController = require("../controller/products")

router.post("/add", ProductsController.createProduct)
router.get("/list-products", ProductsController.listProducts)
router.get("/list-one-by-id/:id", ProductsController.getProduct)
router.put("/update-one-by-id/:id", ProductsController.updateProduct)
router.delete("/delete-one-by-id/:id", ProductsController.deleteProduct)

exports.ProductsRouter = router