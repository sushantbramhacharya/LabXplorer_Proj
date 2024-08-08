import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

const CapsuleForm = ({ capsule, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: capsule ? capsule.id : '',
    title: capsule ? capsule.title : '',
    description: capsule ? capsule.description : '',
    content: capsule ? capsule.content : '',
    category: capsule ? capsule.category : '',
    thumbnail: '',
    images: [],
    pdf: '',
  });

  const [htmlContent, setHtmlContent] = useState(formData.content);

  useEffect(() => {
    setHtmlContent(formData.content);
  }, [formData.content]);

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
    } else if (name === 'pdf') {
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, pdf: reader.result });
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, content: value });
    setHtmlContent(value); // Update HTML content when Quill changes
  };

  const validateForm = () => {
    const { title, description, content, category } = formData;
    return title && description && content && category;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {capsule ? 'Edit Capsule' : 'Add Capsule'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-300 text-lg font-semibold pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Cs">Computer Science</option>
              <option value="Physics">Physics</option>
              <option value="Astronomy">Astronomy</option>
              {/* Add more categories as needed */} 
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-300 text-lg font-semibold pb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="description" className="block text-gray-300 text-lg font-semibold pb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white h-24 resize-none" // Smaller height
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="thumbnail" className="block text-gray-300 text-lg font-semibold pb-2">
              Thumbnail
            </label>
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
          <div className="mb-4 col-span-2">
            <label htmlFor="images" className="block text-gray-300 text-lg font-semibold pb-2">
              Images
            </label>
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
            <label htmlFor="pdf" className="block text-gray-300 text-lg font-semibold pb-2">
              Include PDF Document
            </label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
              onChange={handleFileChange}
              accept="application/pdf"
            />
            {formData.pdf && (
              <iframe
                src={formData.pdf}
                className="mt-4 w-full h-60"
                title="PDF Preview"
              ></iframe>
            )}
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="content" className="block text-gray-300 text-lg font-semibold mb-2">
              Content <span className="text-red-500">*</span>
            </label>
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
