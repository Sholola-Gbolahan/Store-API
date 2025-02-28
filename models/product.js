const mongoose = require(mongoose)

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, "product name must be provded "],
  },
  price: {
    type: Number,
    reqired: [true, "product price must be provded "],
  },
  featured: {
    type: true,
    defualt: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    // Approach : setting up an error message if provided value not found in listed Values
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported", // This says " 'provided values' is not supported"
    },
    // enum: ["ikea", "liddy", "caressa", "marcos"],
  },
})

module.exports = mongoose.model("Product", productSchema)
