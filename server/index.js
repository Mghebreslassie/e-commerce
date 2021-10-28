const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const helmet = require("helmet")
const app = express()
const dotenv = require("dotenv")

//routers
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
const productRouter = require("./routes/product")
const stripeRouter = require("./routes/stripe")
const verifyRouter = require("./routes/verifyToken")

dotenv.config()
const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected to DB`)
  })
  .catch((e) => {
    console.log(e)
  })

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))

app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/cart", cartRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)
app.use("/checkout", stripeRouter)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
