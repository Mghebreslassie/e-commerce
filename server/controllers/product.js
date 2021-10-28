const Product = require("../models/Product")

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedProduct)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Product has been deleted...")
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

const getAllProducts = async (req, res) => {
  try {
    let products

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1)
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      })
    } else {
      products = await Product.find()
    }

    res.status(200).json(products)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
}
