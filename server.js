const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const blogRoute = require("./routes/blog.js")
const authRoute = require("./routes/auth")
require("dotenv").config()

const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology:false
})
.then(()=>console.log("Connecting database complete"))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
app.use('/api',blogRoute)
app.use('/api',authRoute)


const port = process.env.PORT
app.listen(port,()=>console.log(`start server in port ${port}.`))