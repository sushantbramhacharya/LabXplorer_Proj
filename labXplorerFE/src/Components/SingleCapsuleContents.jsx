import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

import { useCapsuleByIdQuery } from "../api/capsuleApi"; // Adjust the path
import { BASE_UPLOAD_URL } from "../constants";

const SingleCapsuleContents = ({id}) => {

  const {
    data: capsule,
    isLoading,
    isError,
  } = useCapsuleByIdQuery({ capsuleId: id });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading capsule data</div>;

  const handleOpenPdf = () => {
    if (capsule?.pdf) {
      window.open(BASE_UPLOAD_URL + capsule.pdf, "_blank");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-slate-700 m-10 p-16 rounded-lg">
        {/* Heading with Scoped Styles */}
        <h1 className="text-slate-300 text-3xl font-bold bg-transparent">
          {capsule.title}
        </h1>
        <hr className="my-2 border-t border-gray-500" />
        <p className="text-slate-400 text-xl italic bg-transparent">
          {capsule.description}
        </p>

        {/* Quill Viewer */}
        <div className="mt-6 bg-transparent">
          <ReactQuill
            value={capsule.content}
            readOnly={true}
            theme="snow"
            modules={{ toolbar: false }} // Disable toolbar
          />
          <style>
            {`
              .ql-container {
                border: none !important; /* Remove border */
                border-radius: 20px !important; /* Add border radius */
                padding-top: 20px !important; /* Remove padding */
                padding-bottom: 20px !important; /* Remove padding */
              }
              .ql-editor {
                border-radius: 20px !important; /* Add border radius */
                min-height: 200px; /* Adjust height if needed */
              }
            `}
          </style>
        </div>
        {/* PDF Button */}
        {capsule?.pdf && (
          <div className="inline-block my-5 bg-transparent">
            <p className="bg-transparent italic font-semibold">Check out document uploaded by author</p>
            <button
              onClick={handleOpenPdf}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12h3l-4-4m0 0l-4 4h3v8h4v-8zM19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
                />
              </svg>
              Open PDF
            </button>
          </div>
        )}

        {/* Responsive Image Gallery */}
        <div className="mt-6 grid grid-cols-1 bg-transparent sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-96">
          {" "}
          {/* Set fixed height here */}
          {capsule.images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full overflow-hidden rounded-lg"
            >
              <img
                src={BASE_UPLOAD_URL + "uploads/" + image.slice(7)}
                alt={`Capsule Image ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() =>
                  openModal(BASE_UPLOAD_URL + "uploads/" + image.slice(7))
                } // Open modal on click
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white h-[90vh] p-4 rounded-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-700 hover:text-gray-900"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Modal View"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCapsuleContents;
