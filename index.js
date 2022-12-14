require('dotenv').config();

const port = 4060
const express = require('express')
const app = express()
const path = require('path')

var cors = require('cors')

var mongoose = require("mongoose");
const connectDB=require("./config/dbCon")

const verifyJWT=require("./middlewares/verifyJWT")


const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}



connectDB()
app.use(express.json())

app.use(cors(corsOptions))


app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

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