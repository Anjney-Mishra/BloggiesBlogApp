const express = require('express')
const router = express.Router()
const User=require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

//create
router.post("/",verifyToken,async(req,res)=>{
    try {
        const {title,desc,photo,username,userId,categories} = req.body
        const newPost = new Post({title,desc,photo,username,userId,categories})
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//getAll
router.get("/",async(req,res)=>{
    const query=req.query
    console.log(query)
    try {
        const searchFilter={
            title:{$regex:query.search,$options:"i"}
        }
        const posts = await Post.find(query.search?searchFilter:null)
        res.status(200).json(posts)
        
    } catch (error) {
        console.log(error)
        res.status(200).json(error)
    }
})

//getById
router.get("/:postId",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.postId)
        res.status(200).json(post)
        
    } catch (error) {
        console.log(error)
        res.status(200).json(error)
    }
})

//getUserPost
router.get("/user/:userId",async(req,res)=>{
    try {
        const post = await Post.find({userId:req.params.userId})
        res.status(200).json(post)
        
    } catch (error) {
        console.log(error)
        res.status(200).json(error)
    }
})


//update
router.put("/:postId",verifyToken,async(req,res)=>{
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.postId,{$set:req.body},{new:true})
        res.status(200).json(updatePost)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//deletePost
router.delete("/:postId",verifyToken,async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.postId)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted")
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})






module.exports=router