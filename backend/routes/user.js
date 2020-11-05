const express = require('express');
const router=express.Router();
const {verifyAccessToken}=require("../helpers/jwtHelper")
const {userById,taskHistory}=require("../controller/user");
const { isAuth,isAdmin } = require('../controller/auth');
const { read,update } = require('../controller/user');


router.get("user/secret/:userId",verifyAccessToken,isAuth,isAdmin,(req,res)=>{
    res.json({user:req.profile})
})

router.get("user/:userId",verifyAccessToken,isAuth,read)
router.put("user/:userId",verifyAccessToken,isAuth,update)
router.get('/task/by/user/:userId', verifyAccessToken, isAuth,taskHistory);



router.param("userId",userById)


module.exports=router
