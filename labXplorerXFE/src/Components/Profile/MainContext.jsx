import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_UPLOAD_URL, BASE_URL } from "../../constants";
import { FaAtom } from "react-icons/fa";

const MainContent = () => {
  const user = useSelector((state) => state.userSlice.user);
  const [favourites, setFavourites] = useState([]);
  const [loadingFavourites, setLoadingFavourites] = useState(true);
  const [favouriteError, setFavouriteError] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/favourites/${user.id}`);
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
        const response = await axios.get(`${BASE_URL}/user/comment?userId=${user.id}`);
        setComments(response.data);
      } catch (error) {
        // Handle error
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [user.id]);

  if (loadingFavourites || loadingComments) return <div className="text-center">Loading...</div>;
  if (favouriteError) return <div className="text-center">Error fetching Favourites: {favouriteError}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-700 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-6 p-2 rounded-md flex items-center justify-center">
        <FaAtom className="inline fill-green-500 mr-2" />
        Welcome, {user.username}
        <FaAtom className="inline fill-green-500 ml-2" />
      </h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 p-2 rounded-md bg-transparent">
        Favourite Capsules
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 bg-transparent">
        {favourites.length > 0 ? (
          favourites.map((capsule) => (
            <div
              key={capsule.id}
              className="bg-slate-600 border p-4 border-gray-500 rounded-lg flex flex-col items-center"
            >
              <img
                src={BASE_UPLOAD_URL + capsule.thumbnail}
                alt={capsule.title}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-transparent">
                {capsule.title}
              </h3>
              <Link
                to={`/capsule/${capsule.id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Explore
              </Link>
            </div>
          ))
        ) : (
          <p className="bg-transparent p-2 text-center">No favourite capsules found.</p>
        )}
      </div>

      <div className="bg-slate-600 border bg border-gray-500 p-4 rounded-md">
        <p className="text-xl font-semibold mb-4 bg-transparent">Your Comments:</p>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li
                key={comment.comment_id}
                className="flex flex-col justify-between items-start mb-4 p-4 bg-slate-500 rounded-md"
              >
                <span className="mb-2 text-lg">{comment.comment_text}</span>
                <Link
                  to={`/capsule/${comment.capsule_id}`}
                  className="font-semibold bg-transparent underline"
                >
                  {comment.capsule_name}
                </Link>
                <hr className="border-t border-slate-500 my-2 w-full" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No comments found.</p>
        )}
      </div>
    </div>
  );
};

export default MainContent;
