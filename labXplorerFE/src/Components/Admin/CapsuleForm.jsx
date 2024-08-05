import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

const CapsuleForm = ({ capsule, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: capsule ? capsule.id : '',
    title: capsule ? capsule.title : '',
    description: capsule ? capsule.description : '',
    content: capsule ? capsule.content : '',
    image: capsule ? capsule.image : '',
    category: capsule ? capsule.category : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'thumbnail') {
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, thumbnail: reader.result });
        };
        reader.readAsDataURL(files[0]);
      }
    } else if (name === 'images') {
      const filesArray = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData({ ...formData, images: filesArray });
    }
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {capsule ? 'Edit Capsule' : 'Add Capsule'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
          <label htmlFor="category" className="block text-gray-300 text-lg font-semibold pb-2">Category</label>
            <select
              id="category"
              name="category"
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Electronics">Electronics</option>
              <option value="Physics">Physics</option>
              <option value="Astronomy">Astronomy</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-300 text-lg font-semibold pb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="description" className="block text-gray-300 text-lg font-semibold pb-2">Description</label>
            <textarea
              id="description"
              name="description"
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white h-24 resize-none" // Smaller height
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="thumbnail" className="block text-gray-300 text-lg font-semibold pb-2">Thumbnail</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
              onChange={handleFileChange}
              accept="image/*"
            />
            {formData.thumbnail && (
              <img
                src={formData.thumbnail}
                alt="Thumbnail Preview"
                className="mt-4 w-1/2 max-h-60 object-cover"
              />
            )}
          </div>

          {/* Multiple Images Input */}
          <div className="mb-4 col-span-2">
            <label htmlFor="images" className="block text-gray-300 text-lg font-semibold pb-2">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
            <div className="mt-4 flex flex-wrap gap-4">
              {formData?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image Preview ${index + 1}`}
                  className="w-1/6 max-h-40 object-cover"
                />
              ))}
            </div>
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="content" className="block text-gray-300 text-lg font-semibold mb-2">Content</label>
            <ReactQuill
              value={formData.content}
              onChange={handleQuillChange}
              theme="snow"
              className="h-[70vh]"
              modules={modules}
              formats={formats}
            />
          </div>
          
        </div>
        <div className="flex pt-4 justify-end gap-4">
          <button
            type="button"
            className="bg-gray-600 text-white p-3 rounded-lg shadow hover:bg-gray-700 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

// Quill editor configuration
const modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'header': '1' }, { 'header': '2' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link'],
    [{ 'align': [] }],
    ['clean'] // Remove formatting button
  ],
};

const formats = [
  'font', 'header', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'align'
];

export default CapsuleForm;
