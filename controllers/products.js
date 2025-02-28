const Product = require("../models/product")

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "products testing routes" })
}
const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({})
    res.status(200).json({ product })
  } catch (error) {
    console.log(error)
  }
}

const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  res.status(200).json({ product })
}

module.exports = { getAllProducts, getAllProductsStatic, createProduct }
