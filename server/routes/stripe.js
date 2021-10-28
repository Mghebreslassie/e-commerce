const router = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_KEY)
const { payment } = require("../controllers/stripe")

router.post("/payment", payment)

module.exports = router
