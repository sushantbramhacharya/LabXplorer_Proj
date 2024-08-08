import React from 'react';
import { BASE_UPLOAD_URL, BASE_URL } from '../../constants';

const Capsules = ({ capsule, onEdit, onDelete }) => {
  return (
    <div className=" p-4 m-5 xl:w-[30%] lg:w-[40%] md:w-[100%] rounded-lg shadow-md flex flex-col items-center">
      <img
        src={BASE_UPLOAD_URL+capsule?.thumbnail || 'https://via.placeholder.com/150'}
        alt={capsule?.title}
        className="w-32 h-32 object-cover rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{capsule?.title}</h2>
      <p className="text-gray-600 mb-4">{capsule?.description}</p>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(capsule?.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(capsule?.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Capsules;
