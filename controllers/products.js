const Products = require("../models/product")

const getAllProductsStatic = async (req, res) => {
  const search = "din" // this is our re.query
  try {
    // The skip func skips the assigned number of products
    const products = await Products.find({})
      .sort("name")
      .select("name price")
      .limit(10)
      .skip(1)

    res.status(200).json({ nbHits: products.length, products })
  } catch (error) {
    console.log(error)
  }
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query // Looking for only featured

  const queryObject = {}

  if (featured) {
    // if featured is true then set featured property to true, else false set it to false
    queryObject.featured = featured === "true" ? true : false
  }
  if (company) {
    // if company  property to exit,set company in queryObject to it value
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }
  }

  // console.log(queryObject)

  // This show list of all products if passed query not exit
  let result = Products.find(queryObject)

  // SORT

  if (sort) {
    // Splinting on  comma "'" and joining it back from the array by adding empty space
    const shortList = sort.split(",").join(" ")
    result = result.sort(shortList)
  }
  // setting up a default sort where user hasn't pass in the sort key using created time
  else {
    result = result.sort("createdAT")
  }

  //  FIELDS
  if (fields) {
    const fieldsList = fields.split(",").join(" ")
    result = result.select(fieldsList)
  }

  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}

const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  res.status(200).json({ product })
}

module.exports = { getAllProducts, getAllProductsStatic, createProduct }
