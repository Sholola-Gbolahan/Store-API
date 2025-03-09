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
  const { featured, company } = req.query // Looking for only featured

  const queryObject = {}

  if (featured) {
    // if featured is true then set featured property to true, else false set it to false
    queryObject.featured = featured === "true" ? true : false
  }
  if (featured) {
    // if company  property to exit,set company in queryObject to it value
    queryObject.company = company
  }

  console.log(queryObject)
  // This show list of all products if passed query not exit
  const products = await Products.find(queryObject)
  res.status(200).json({ products, nbHits: products.length })
}

const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  res.status(200).json({ product })
}

module.exports = { getAllProducts, getAllProductsStatic, createProduct }
