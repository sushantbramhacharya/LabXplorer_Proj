import React, { useState } from 'react';
import CapsulesHome from '../../Components/Admin/Capsules';

export const MainScreen = () => {
  const [capsules, setCapsules] = useState([
    {
      id: 1,
      title: 'Basic Chemistry',
      description: 'Learn the fundamentals of chemistry with interactive experiments.',
      image: 'https://via.placeholder.com/150',
      category: 'Chemistry',
    },
    {
      id: 2,
      title: 'Basic Electronics',
      description: 'Explore basic electronics concepts through hands-on simulations.',
      image: 'https://via.placeholder.com/150',
      category: 'Electronics',
    },
    {
      id: 3,
      title: 'Advanced Electronics',
      description: 'Deep dive into advanced electronics and circuits.',
      image: 'https://via.placeholder.com/150',
      category: 'Electronics',
    },
    // Add more capsules as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleEdit = (id) => {
    console.log('Edit capsule with ID:', id);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    setCapsules(capsules.filter((capsule) => capsule.id !== id));
  };

  const handleAddCapsule = () => {
    console.log('Add new capsule');
    // Implement functionality to open modal or navigate to add capsule form
  };

  // Filter capsules based on search query and selected category
  const filteredCapsules = capsules.filter((capsule) => {
    const matchesQuery = capsule.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || capsule.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <h1 className='text-center text-5xl py-5'>Capsules</h1>
      
      <div className='flex flex-col md:flex-row gap-4 p-4 w-11/12 md:w-1/2 mx-auto items-center'>
        <input
          type="text"
          placeholder="Search capsules..."
          className="p-3 border border-gray-300 rounded-lg flex-1"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        <select
          className="p-3 border border-gray-300 rounded-lg flex-1"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          <option value="chemistry">Chemistry</option>
          <option value="physics">Physics</option>
          <option value="astronomy">Astronomy</option>
          {/* Add more categories as needed */}
        </select>

        <button
          onClick={handleAddCapsule}
          className="bg-blue-500 text-white p-3 rounded-lg shadow hover:bg-blue-600 transition-colors flex-none"
        >
          Add Capsule
        </button>
      </div>
      
      <div className='flex flex-wrap m-2 bg-slate-700 justify-center'>
        {filteredCapsules.slice(0, 9).map((capsule) => (
          <CapsulesHome
            key={capsule.id}
            capsule={capsule}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};
