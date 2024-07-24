// src/components/Sidebar.js
import React from 'react';


const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white h-screen">
      <div className="flex items-center justify-center h-16 bg-gray-700 border-b border-gray-600">
        <h1 className="text-xl font-semibold">Welcome Admin</h1>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">Item 1</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">Item 2</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">Item 3</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">Item 4</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">Item 5</a>
          </li>
        </ul>
      </nav>
      <div className="flex items-center justify-center h-16 bg-gray-700 border-t border-gray-600">
        <a href="#" className="text-blue-300 hover:text-blue-500">Settings</a>
      </div>
    </div>
  );
};

export default Sidebar;
