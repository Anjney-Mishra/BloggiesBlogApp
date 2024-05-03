import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { BK_URL } from "../utils/constants";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";


const Home = () => {
  const { search } = useLocation();
  const [noResult, setNoResult] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  const {user} = useContext(UserContext)
  // console.log(user)

  const fetchPosts = async () => {
    try {
      setLoader(true);
      const res = await axios.get(BK_URL + "/api/post/" + search);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResult(true);
      } else setNoResult(false);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <h1>Loading...</h1>
        ) : !noResult ? (
          posts && posts.map((post) => 
          <>
          <Link to={user?`/posts/post/${post._id}`:'/login'}>
          <HomePosts key={post._id} post={post} />
          </Link>
          </>
        )
        ) : (
          <h1 className="text-center font-bold mt-16">No Posts Found</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
