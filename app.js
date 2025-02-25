require("dotenv").config()
// async errors
const express = require("express")
const app = express()

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

// #Products route
// All products routes will go here

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // # Connect to DB
    // ensure database is connected before App listen

    // # Listen to app from port
    app.listen(port, console.log(`Server is listening to the port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
