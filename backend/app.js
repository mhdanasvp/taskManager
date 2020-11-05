const express = require('express');
const morgan=require("morgan")
const createError=require("http-errors")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const { readdirSync } =require("fs")
const app=express()


require('dotenv').config();
require("./helpers/initMongodb")

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())



readdirSync("./routes").map((r)=>app.use("/api",require(`./routes/${r}`)))

app.use(async(req,res,next)=>{
    
    next(createError.NotFound())
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message: err.message
        }
    })
})


const PORT=process.env.PORT||8000
app.listen(PORT,()=>console.log(`server running on ${PORT}`))