import React, { useContext } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { BK_URL } from "../utils/constants";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const Comment = ({ c,post }) => {
  const { user } = useContext(UserContext);
  const deleteComment = async (id) => {
    try {
      await axios.delete(BK_URL+"/api/comment/"+id,{withCredentials:true})
      window.location.reload(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c?.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c?.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c?.updatedAt).toString().slice(16, 24)}</p>
          {user._id === c?.userId ? (
            <div className="flex justify-center items-center space-x-4">
              <p onClick={()=>deleteComment(c._id)} className="cursor-pointer">
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c?.comment}</p>
    </div>
  );
};

export default Comment;
