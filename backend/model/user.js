const bcrypt=require("bcrypt");

const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:255,
        minlength:4,

    },
    phone:{
        type:String,
        trim:true,
        required:true,
        maxlength:25,
        minlength:10,

    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
    role:{
        type:String,
        // 0-user, 1-admin
        default:0
    },
},{timestamps:true})

userSchema.pre("save",async function (next){
    try {
        if(this.isNew){
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(this.password,salt)
            this.password=hashedPassword
        }
        next()
    } catch (error) {
        next(error)
    }
})
userSchema.methods.isValidPassword=async function(password){
    try {
        return await  bcrypt.compare(password,this.password)
    } catch (error) {
        throw error
    }
}

const User=mongoose.model("User",userSchema)

module.exports=User

