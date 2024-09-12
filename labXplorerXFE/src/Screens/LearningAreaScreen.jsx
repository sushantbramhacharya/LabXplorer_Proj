import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';

const LearningAreaScreen = () => {
  const categories = [
    { name: 'Physics', description: 'Explore the fundamentals of physics through interactive experiments.', image: 'https://miro.medium.com/v2/resize:fit:1024/1*bWlRl9D3jkJR06_oO0cP_Q.png', path: '/physics' },
    { name: 'Chemistry', description: 'Dive into the world of chemistry with engaging simulations.', image: 'https://images.newscientist.com/wp-content/uploads/2021/02/23162716/chemistry.jpg', path: '/chemistry' },
    { name: 'Computer Science', description: 'Learn the basics of electronics with hands-on activities.', image: 'https://www.mtu.edu/cs/what/images/what-is-computer-science-banner1600.jpg', path: '/cs' },
    { name: 'Astronomy', description: 'Discover the universe with interactive astronomy simulations.', image: 'https://static.scientificamerican.com/dam/m/128e9a2bf8a1939/original/DM0HT8_WEB.jpg?w=1200', path: '/astronomy' },
  ];

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent shadow-lg p-4 rounded-lg text-center">
          Learning Areas in Our Platform
        </h1>

        <div className="space-y-4 bg-slate-700 py-5 rounded-lg">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col md:flex-row items-center mx-auto max-w-4xl rounded-lg shadow-lg overflow-hidden bg-slate-800">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full md:w-1/3 h-48 object-cover"
              />
              <div className="w-full md:w-2/3 p-4">
                <h2 className="text-xl md:text-2xl font-bold text-white">{category.name}</h2>
                <p className="text-gray-200 mt-2">{category.description}</p>
                <Link to={`/capsules${category.path}`}>
                  <button className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LearningAreaScreen;
