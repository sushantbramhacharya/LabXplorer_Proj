// src/components/MainContent.js
import React from 'react';

const MainContent = () => {
  return (
    <div className="flex-grow p-6 bg-slate-700">
      <h1 className="text-2xl font-semibold mb-4 ">Main Content</h1>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-600 border border-gray-500 h-24"></div>
        <div className="bg-slate-600 border border-gray-500 h-24"></div>
        <div className="bg-slate-600 border border-gray-500 h-24"></div>
      </div>
      <div className="bg-slate-600 border border-gray-500 h-48">
        <p className="p-4">This is the larger box below the three boxes. You can add more content here.</p>
      </div>
    </div>
  );
};

export default MainContent;
