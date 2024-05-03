const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

//Register
router.post("/register",async(req,res)=>{
    try {
        const {username,email,password}=req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password,salt)
        const newUser = new User({username,email,password:hashedPassword})
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
        
    } catch (error) {
        res.status(500).json(error)
    }
})



//Login
router.post("/login",async(req,res)=>{
    try {
        const user= await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json("User Not Found")
        }
        const matched = await bcrypt.compare(req.body.password,user.password)
        if(!matched){
            return res.status(401).json("Wrong Credentials!")
        }
        const token = jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=user._doc
        res.cookie("token",token,{secure:"true",sameSite:"None"}).status(200).json(info)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})




//Logout
router.get("/logout",async(req,res)=>{
    try {
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User Logged Out Successfully")
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//refetch
router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})




module.exports=router