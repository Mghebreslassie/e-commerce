const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken")
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
} = require("../controllers/order")
const router = require("express").Router()

router.post("/", verifyToken, addOrder)
router.put("/:id", verifyTokenAndAdmin, updateOrder)
router.delete("/:id", verifyTokenAndAdmin, deleteOrder)
router.get("/find/:userId", verifyTokenAndAuth, getOrder)
router.get("/", verifyTokenAndAdmin, getAllOrders)
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome)

module.exports = router
