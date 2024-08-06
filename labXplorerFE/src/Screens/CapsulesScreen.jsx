import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';

const CapsulesScreen = () => {
  const {category}=useParams()
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const capsules = [
    { name: 'Biology', description: 'Explore the living world with interactive biology capsules.', image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', path: '/biology' },
    { name: 'Mathematics', description: 'Dive into the world of numbers with engaging math capsules.', image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', path: '/mathematics' },
    { name: 'Computer Science', description: 'Learn the basics of computing with hands-on activities.', image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', path: '/computer-science' },
    { name: 'Geography', description: 'Discover the Earth with interactive geography capsules.', image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', path: '/geography' },
  ];

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h1 className="text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent shadow-lg p-4 rounded-lg text-center">
          {capitalizeFirstLetter(category)} Capsules in Our Platform
        </h1>

        <div className="space-y-4 bg-slate-700 py-5 rounded-lg">
          {capsules.map((capsule) => (
            <div key={capsule.name} className="flex w-2/3 mx-auto items-center rounded-lg shadow-lg overflow-hidden">
              <img src={capsule.image} alt={capsule.name} className="w-1/3 h-48 object-cover" />
              <div className="w-2/3 p-4">
                <h2 className="text-2xl font-bold">{capsule.name}</h2>
                <p className="text-gray-200 mt-2">{capsule.description}</p>
                <Link to={capsule.path}>
                  <button className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900">Explore</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CapsulesScreen;
