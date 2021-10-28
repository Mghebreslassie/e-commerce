const router = require("express").Router()
const { verifyTokenAndAdmin } = require("./verifyToken")
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/product")

router.post("/addProduct", verifyTokenAndAdmin, addProduct)
router.put("/updateProduct/:id", verifyTokenAndAdmin, updateProduct)
router.delete("/deleteProduct/:id", verifyTokenAndAdmin, deleteProduct)
router.get("/getProduct/:id", getProduct)
router.get("/", getAllProducts)

module.exports = router
