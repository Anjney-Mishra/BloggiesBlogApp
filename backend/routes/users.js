const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User=require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

//update
router.put("/:id",verifyToken,async(req,res)=>{
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        $set:
// $set is an operator used in MongoDB update operations.
// It allows you to specify which fields you want to update in a document without affecting other fields.
// For example, if you have a document with fields { name: "John", age: 30 } and you want to update only the name field, you would use $set like this: {$set: { name: "Jane" }}.
// Using $set ensures that only the specified fields are updated, leaving other fields unchanged.
// { new: true }:

// { new: true } is an option in Mongoose's findByIdAndUpdate() method.
// It tells Mongoose to return the modified document after the update operation completes.
// By default, Mongoose returns the original document before the update.
// Setting { new: true } ensures that you receive the updated document in the result of the findByIdAndUpdate() method, allowing you to work with the latest data.
        res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


//delete
router.delete("/:id",verifyToken,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted")
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


//get user
router.get("/:id",async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password,...info} = user._doc
        res.status(200).json(info)
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


module.exports=router