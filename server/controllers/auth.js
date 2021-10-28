const Crypto = require("crypto-js")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

//register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const newUser = new User({
      username,
      email,
      password: Crypto.AES.encrypt(password, process.env.PASSCODE),
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500)
    console.log(error)
  }
}

//login
const login = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const findResult = await User.findOne({
      email,
      username,
    })
    !findResult && res.status(400).json("No user found")
    const hashPass = Crypto.AES.decrypt(
      findResult.password,
      process.env.PASSCODE
    )
    const originalPass = hashPass.toString(Crypto.enc.Utf8)
    if (originalPass === password) {
      const accessToken = jwt.sign(
        { id: findResult._id, isAdmin: findResult._isAdmin },
        process.env.JWT_KEY,
        { expiresIn: "3d" }
      )
      const { password: pass, ...userInfo } = findResult._doc
      res.send({ ...userInfo, accessToken })
    } else {
      res.status(400).json("Incorrect password")
    }
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

module.exports = { register, login }
