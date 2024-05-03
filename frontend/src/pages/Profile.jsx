import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { BK_URL } from "../utils/constants";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const params = useParams().id
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [posts,setPosts] = useState([])
  const {user,setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const fetchProfile = async() => {
    try {
      const res = await axios.get(BK_URL+"/api/user/"+user._id)
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleUserUpdate = async() => {
    try {
      const res = await axios.put(BK_URL+"/api/user/"+user._id,{username,email,password},{withCredentials:true})
      toast.success('Successfully Updated');
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleUserDelete = async() => {
    try {
      const ref = window.confirm("Are you sure you want to delete account ?")
      if(ref)
        {
          const res = await axios.delete(BK_URL+"/api/user/"+user._id,{withCredentials:true})
          setUser(null)
          toast.success('Successfully Deleted Account');
          navigate("/")
        }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(BK_URL+"/api/post/user/"+user._id)
      setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(posts) 

  useEffect(()=>{fetchProfile()},[params])
  useEffect(()=>{fetchUserPosts()},[])

  return (
    <div>
      <Navbar />
      <div className="p-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse items-start">
        <div className="flex flex-col md:w-[70%] w-full">
          <h1 className="text-xl font-bold mb-4">Your Posts</h1>
          {posts.map((p)=> (<ProfilePosts key={p._id} p={p}/>))}
        </div>
        <div className="flex justify-start md:sticky md:top-16 md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="your username"
            />
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="your email"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
                Update
              </button>
              <button onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
