import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CapsulesHome from '../../Components/Admin/Capsules';
import { useAllCapsulesQuery, useDeleteCapsuleMutation } from '../../api/capsuleApi';

export const MainScreen = () => {
  const { data: capsules, error, isLoading,refetch } = useAllCapsulesQuery();

  // Ensure no hooks are called conditionally or inside functions
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteCapsule] = useDeleteCapsuleMutation();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching Capsules: {error.message}</div>;
  
  //Delete Functionality  
  
  const handleDeleteCapsule=async(capsuleId)=>{
    if(confirm("Are You Sure to delete?"))
    {
      await deleteCapsule({capsuleId})
      refetch()
    }
  }


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

  // Perform filtering outside of the render method
  const filteredCapsules = capsules ? capsules.filter((capsule) => {
    const matchesQuery = capsule.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || capsule.category === selectedCategory;
    return matchesQuery && matchesCategory;
  }) : [];

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

        <Link
          to='/admin/add'
          className="bg-blue-500 text-white p-3 rounded-lg shadow hover:bg-blue-600 transition-colors flex-none"
        >
          Add Capsule
        </Link>
      </div>
      
      <div className='flex flex-wrap m-2 bg-slate-700 justify-center'>
        {filteredCapsules.slice(0, 9).map((capsule) => (
          <CapsulesHome
            key={capsule.id}
            capsule={capsule}
            onEdit={handleEdit}
            onDelete={handleDeleteCapsule}
          />
        ))}
      </div>
    </>
  );
};
