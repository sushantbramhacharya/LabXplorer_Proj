import React, { useState } from 'react';
import NavBar from '../Components/NavBar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const capsuleData = {
  name: 'Sample Capsule',
  description: 'This is a description for the sample capsule. It provides insight into what the capsule is about.',
  content: `<p>This <h1>is some rich content from Quill.</h1> It can include <strong>bold</strong> text, <em>italic</em> text, and more.</p>
            <img src="https://via.placeholder.com/600x400" alt="Sample" />`,
  images: [
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/600x400',
  ],
};

const SingleCapsuleScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      <NavBar />
      <div className='bg-slate-700 m-10 p-16 rounded-lg'>
        {/* Heading with Scoped Styles */}
        <h1 className='text-slate-300 text-3xl font-bold bg-transparent'>{capsuleData.name}</h1>
        <hr className='my-2 border-t border-gray-500' />
        <p className='text-slate-400 text-xl italic bg-transparent'>{capsuleData.description}</p>
        
        {/* Quill Viewer */}
        <div className='mt-6 bg-transparent'>
          <ReactQuill 
            value={capsuleData.content}
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

        {/* Responsive Image Gallery */}
        <div className='mt-6 grid grid-cols-1 bg-transparent sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {capsuleData.images.map((image, index) => (
            <div key={index} className='w-full h-auto overflow-hidden rounded-lg'>
              <img 
                src={image} 
                alt={`Capsule Image ${index + 1}`} 
                className='w-full h-full object-cover cursor-pointer'
                onClick={() => openModal(image)} // Open modal on click
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-lg relative'>
            <button 
              onClick={closeModal} 
              className='absolute top-2 right-2 text-2xl font-bold text-gray-700 hover:text-gray-900'
            >
              ×
            </button>
            <img src={selectedImage} alt='Modal View' className='max-w-full max-h-full' />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCapsuleScreen;
