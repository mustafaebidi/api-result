require('dotenv').config();

const port = 4060
const express = require('express')
const app = express()

var cors = require('cors')

var mongoose = require("mongoose");
const connectDB=require("./config/dbCon")

const verifyJWT=require("./middlewares/verifyJWT")

connectDB()
app.use(express.json())

app.use(cors({origin: '*'}));

//routes
app.use('/auth',require('./routes/auth'))

app.use(verifyJWT)
app.use('/results',require('./routes/result'))
app.use("/profile",require('./routes/profile'))


app.all("*",(req,res,next)=>{
  res.status(404).json("the page not found")
})


    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})