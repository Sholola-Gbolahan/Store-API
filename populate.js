require("dotenv").config() // importing .env configuration
const connectDB = require("./db/connect") // importing Database connection
const Product = require("./models/product") // importing Products models

const jsonProducts = require("./products.json") // importing handcoded products list

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany() // This deletes any existing data's in the DB
    await Product.create(jsonProducts) // this creates new products by passing in Json products to the DB
    console.log("SUCCESS!!!!")
  } catch (error) {
    console.log(error)
  }
}

start()
