const express = require("express")
const router = express.Router()
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../routes/verifyToken")
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  userStats,
} = require("../controllers/user")

router.put("/:id", verifyTokenAndAuth, updateUser)
router.delete("/:id", verifyTokenAndAuth, deleteUser)
router.get("/:id", verifyTokenAndAdmin, getUser)
router.get("/allUsers", verifyTokenAndAdmin, getAllUsers)
router.get("/userStats", verifyTokenAndAuth, userStats)
module.exports = router
