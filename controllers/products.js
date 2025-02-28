const Products = require("../models/product")

const getAllProductsStatic = async (req, res) => {
  try {
    const products = await Products.find({ company: "marcos" })
    res.status(200).json({ products, nbHits: products.length })
  } catch (error) {
    console.log(error)
  }
}
const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products routes " })
}

const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  res.status(200).json({ product })
}

module.exports = { getAllProducts, getAllProductsStatic, createProduct }
