const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken")
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart,
} = require("../controllers/cart")
const router = require("express").Router()

router.post("/", verifyToken, createCart)
router.put("/:id", verifyTokenAndAuth, updateCart)
router.delete("/:id", verifyTokenAndAuth, deleteCart)
router.get("/find/:userId", verifyTokenAndAuth, getCart)
router.get("/", verifyTokenAndAdmin, getAllCart)

module.exports = router
