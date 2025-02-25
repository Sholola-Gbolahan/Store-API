require("dotenv").config()
// async errors
const express = require("express")
const app = express()

// # importing DB function
const connectDB = require("./db/connect")

const productsRouter = require("./routes/products")

// #Importing Not found and error middleware
const notFoundMiddleware = require("./middleware/not-found")
const errorMiddleware = require("./middleware/error-handler")

// # Middleware
app.use(express.json())

// # Routes
//
app.get("/", (req, res) => {
  res.send('<h1>Store API<a href="/api/v1/products"> products routes</a></h1>')
})

app.use("/api/v1/products", productsRouter)

// # Products route
// All products routes will go here

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // # Connect to DB
    // Passing the database url to make the connection
    await connectDB(process.env.MONGO_URI)

    // # Listen to app from port
    app.listen(port, console.log(`Server is listening to the port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
