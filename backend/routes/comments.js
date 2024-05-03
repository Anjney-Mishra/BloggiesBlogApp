const express = require('express')
const router = express.Router()
const User=require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

//create
router.post("/create",verifyToken, async(req,res)=>{
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


//getPostCOmment
router.get("/post/:postId",async(req,res)=>{
    try {
        const post = await Comment.find({postId:req.params.postId})
        res.status(200).json(post)
        
    } catch (error) {
        console.log(error)
        res.status(200).json(error)
    }
})


//update
router.put("/:commentId",verifyToken,async(req,res)=>{
    try {
        const updateComment = await Comment.findByIdAndUpdate(req.params.commentId,{$set:req.body},{new:true})
        res.status(200).json(updateComment)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//delete
router.delete("/:commentId",verifyToken,async(req,res)=>{
    try {
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json("Comment has been deleted")
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})



module.exports=router