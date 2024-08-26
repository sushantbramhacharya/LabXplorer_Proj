import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_UPLOAD_URL, BASE_URL } from "../../constants";
import { FaAtom } from "react-icons/fa6";

const MainContent = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [favourites, setFavourites] = useState([]);
  const [loadingFavourites, setLoadingFavourites] = useState(true);
  const [favouriteError, setFavouriteError] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/favourites/${user.id}`
        );
        setFavourites(response.data);
      } catch (error) {
        setFavouriteError(error.message);
      } finally {
        setLoadingFavourites(false);
      }
    };

    fetchFavourites();
  }, [user.id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/comment?userId=${user.id}`
        );
        setComments(response.data);
      } catch (error) {
        setCommentError(error.message);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [user.id]);

  if (loadingFavourites || loadingComments) return <div>Loading...</div>;
  if (favouriteError)
    return <div>Error fetching Favourites: {favouriteError}</div>;
  if (commentError) return <div>Error fetching Comments: {commentError}</div>;

  return (
    <div className="flex-row p-6 bg-slate-700">
      <h1 className="text-4xl font-semibold mb-4 p-2 rounded-md flex items-center ">
        <FaAtom className="inline fill-green-500 mr-2" />
        Welcome, {user.username}
        <FaAtom className="inline fill-green-500 ml-2" />
      </h1>
      <h1 className="text-2xl font-semibold mb-2 bg-transparent p-2 rounded-md">
        Favourite Capsules
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-6 bg-transparent">
        {favourites.length > 0 ? (
          favourites.map((capsule) => (
            <div
              key={capsule.id}
              className="bg-slate-600 border p-4 border-gray-500 rounded-lg flex flex-col items-center"
            >
              <img
                src={BASE_UPLOAD_URL + capsule.thumbnail}
                alt={capsule.title}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />

              <h2 className="text-xl font-semibold mb-2 bg-transparent">
                {capsule.title}
              </h2>
              <div className="flex gap-3 bg-transparent">
                <Link
                  to={`/capsule/${capsule.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No favourite capsules found.</p>
        )}
      </div>

      <div className="bg-slate-600 border border-gray-500 p-2 ">
        <p className="p-4 text-xl">Your Comments:</p>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li
                key={comment.comment_id}
                className="flex m-2 bg-transparent flex-col justify-between items-start mb-2 p-4 bg-slate-500 rounded-md"
              >
                <span className="mb-2 text-lg">{comment.comment_text}</span>
                <Link
                  to={"/capsule/" + comment.capsule_id}
                  className="font-semibold mb-2 bg-transparent underline"
                >
                  {comment.capsule_name}
                </Link>
                <hr className="border-t border-slate-500 my-2 w-full"/>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
};

export default MainContent;
