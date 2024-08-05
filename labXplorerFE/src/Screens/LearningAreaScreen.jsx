import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';

const LearningAreaScreen = () => {
  const categories = [
    { name: 'Physics', description: 'Explore the fundamentals of physics through interactive experiments.', image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', path: '/physics' },
    { name: 'Chemistry', description: 'Dive into the world of chemistry with engaging simulations.', image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', path: '/chemistry' },
    { name: 'Electronics', description: 'Learn the basics of electronics with hands-on activities.', image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', path: '/electronics' },
    { name: 'Astronomy', description: 'Discover the universe with interactive astronomy simulations.', image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', path: '/astronomy' },
  ];

  return (
    <>
      <NavBar />
      <div className="p-4 ">
      <h1 class="text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent shadow-lg p-4 rounded-lg text-center">
  Learning Areas in Our Platform
</h1>



        <div className="space-y-4 bg-slate-700 py-5 rounded-lg">
          {categories.map((category) => (
            <div key={category.name} className="flex w-2/3 mx-auto items-center  rounded-lg shadow-lg overflow-hidden">
              <img src={category.image} alt={category.name} className="w-1/3 h-48 object-cover" />
              <div className="w-2/3 p-4">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <p className="text-gray-200 mt-2">{category.description}</p>
                <Link to={category.path}>
                  <button className="mt-4 px-4 py-2 bg-slate-700  text-white rounded hover:bg-slate-900">Explore</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LearningAreaScreen;
