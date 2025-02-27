const getAllProductsStatic = async (req, res) => {
  // Testing express async error is catching errors
  throw new Error("Testing async error")
  res.status(200).json({ msg: "products testing routes " })
}
const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products routes " })
}

module.exports = { getAllProducts, getAllProductsStatic }
