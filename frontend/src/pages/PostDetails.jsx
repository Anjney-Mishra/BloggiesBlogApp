import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdEdit, MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BK_URL, IF } from "../utils/constants";
import { UserContext } from "../contexts/UserContext";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(BK_URL + "/api/post/" + postId);
      setPost(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(BK_URL + "/api/comment/post/" + postId);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      await axios.delete(BK_URL + "/api/post/" + postId, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BK_URL + "/api/comment/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      window.location.reload(true)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  return (
    <div>
      <Navbar />
      {loader ? (
        <h1>Loading...</h1>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <MdEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:m-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img src={IF + post.photo} className="mx-auto w-full" alt="" />
          <p className="mx-auto mt-0">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post?.categories?.map((c, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            {/* comments */}
            <h3 className="mt-6 mb-4 font-semibold">Comments</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post}/>
            ))}
          </div>
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment"
              className="w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <button
              onClick={postComment}
              className="bg-black text-white text-sm px-4 py-2 md:w-[20%] md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
