const Products = require("../models/product")

const getAllProductsStatic = async (req, res) => {
  const search = "din" // this is our re.query
  try {
    // The skip func skips the assigned number of products
    const products = await Products.find({ price: { $gt: 30 } })
      .sort("price")
      .select("name price")
    // .limit(10)
    // .skip(1)

    res.status(200).json({ nbHits: products.length, products })
  } catch (error) {
    console.log(error)
  }
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query // Looking for only featured

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

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt", // greater than
      ">=": "$gte", //greater than or equal
      "=": "$eq", //equals to
      "<": "$lt", // lessthan than
      "<=": "$lte", //lessthan than or equal
    }

    // Regular expression to match operators
    const regEx = /\b(<|>|>=|=|<|<=)\b/g

    // Replace operators with MongoDB operators
    let filters = numericFilters.replace(
      regEx,
      (match) => `--${operatorMap[match]}`
    )
    console.log(filters)
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
    result = result.sort("createdAt")
  }

  //  FIELDS
  if (fields) {
    const fieldsList = fields.split(",").join(" ")
    result = result.select(fieldsList)
  }

  // converting the page string value to number and setting a default page on 1
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10 // getting limit from query and if no limit set default to 10
  const skip = (page - 1) * limit // Logic setup of how many products to skip - this goes to the next page

  // Applying funcs to products
  result = result.skip(skip).limit(limit)

  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}

const createProduct = async (req, res) => {
  const product = await Products.create(req.body)
  res.status(200).json({ product })
}

module.exports = { getAllProducts, getAllProductsStatic, createProduct }
