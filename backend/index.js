const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require("path")
const authRouter = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
dotenv.config()
const app = express();

//database connection
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is connected successfully")

    }catch(error){
        console.log(error)
    }
}

//middleware
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use(cors({origin:["http://localhost:5173", "http://127.0.0.1:5173"],credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRoute)
app.use("/api/post",postRoute)
app.use("/api/comment",commentRoute)

//image upload
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image uploaded successfully")
})


app.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`App is running on port ${process.env.PORT}`)
})