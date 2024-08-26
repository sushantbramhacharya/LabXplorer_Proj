import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants";
import { FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Comments = ({ capsuleId }) => {
  const authorName = useSelector((state) => state.userSlice.user.username);
  const authorId = useSelector((state) => state.userSlice.user.id);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [sortOrder, setSortOrder] = useState("latest"); // 'latest' or 'oldest'

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/capsule/comment?capsuleId=${capsuleId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [capsuleId]);

  // Sort comments based on sortOrder
  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  // Handle submitting a new comment
  const handleCommentSubmit = async () => {
    if (confirm("Are you sure you want to comment?") && commentText.trim()) {
      try {
        const response = await axios.post(`${BASE_URL}/capsule/comment`, {
          capsuleId,
          comment: commentText,
          authorId,
        });
        setComments([
          ...comments,
          {
            comment_id: response.data.comment_id,
            capsule_id: capsuleId,
            user_id: authorId,
            comment_text: commentText,
            created_at: new Date().toISOString(),
          },
        ]);
        setCommentText("");
      } catch (error) {
        console.error("Error submitting comment", error);
      }
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(`${BASE_URL}/capsule/comment`, {
          data: { commentId },
        });
        setComments(
          comments.filter((comment) => comment.comment_id !== commentId)
        );
      } catch (error) {
        console.error("Error deleting comment", error);
      }
    }
  };

  return (
    <div className="mx-12 my-6 p-6 bg-slate-600 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 bg-transparent">Comments</h2>

      <div className="mb-4 bg-transparent">
        <button
          className={`px-2 py-1 mr-2 ${
            sortOrder === "latest"
              ? "bg-slate-500 text-white"
              : "bg-transparent"
          } rounded-md `}
          onClick={() => setSortOrder("latest")}
        >
          Latest
        </button>
        <button
          className={`px-2 py-1 ${
            sortOrder === "oldest"
              ? "bg-slate-500 text-white"
              : "bg-transparent "
          } rounded-md `}
          onClick={() => setSortOrder("oldest")}
        >
          Oldest
        </button>
      </div>
          {authorId?<div className="mb-4 bg-transparent">
        <textarea
          className="w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleCommentSubmit}
        >
          Submit
        </button>
      </div>:<div className="bg-transparent my-3">Please Sign In to Comment <Link to='/login' className="bg-transparent italic underline">Login here</Link>
      </div>}
      

      <div className="space-y-4 bg-transparent">
        {sortedComments.map((comment) => (
          <div key={comment.comment_id} className="p-4 bg-gray-300 rounded-lg">
            <p className="text-sm font-semibold text-gray-800 bg-transparent">
              {authorName}
            </p>
            <p className="text-sm text-gray-700 bg-transparent">
              {comment.comment_text}
            </p>
            <span className="text-xs text-gray-500">
              {new Date(comment.created_at).toLocaleTimeString()}
            </span>
            {comment.user_id === authorId && (
              <button
                className="mt-2 mx-2 text-red-500 hover:underline"
                onClick={() => handleDeleteComment(comment.comment_id)}
              >
                <FaTrash className="mr-2" fill='red' />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
