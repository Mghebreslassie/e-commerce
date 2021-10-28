const Crypto = require("crypto-js")
const User = require("../models/User")

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      proces.env.PASS_CODE
    ).toString()
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted")
  } catch (err) {
    res.status(500).json(err)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const query = req.query.new
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

const userStats = async (req, res) => {
  try {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ])
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}
module.exports = { updateUser, deleteUser, getUser, getAllUsers, userStats }
