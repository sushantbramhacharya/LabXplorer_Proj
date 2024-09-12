// pages/index.js
import React from "react";
import HeaderImage from "../assets/solar.png";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <nav>
      <NavBar/>

      <div className="area flex flex-col md:flex-row items-center px-4 md:px-20 py-8">
        <div className="flex flex-col items-center md:items-start w-full md:w-2/3 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Learning By Doing</h1>
          <p className="text-lg md:text-xl mb-6">
            A Science and Technology Learning platform for students.
          </p>

          <Link to="/simulations" className="inline-flex px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg shadow-lg">
            Get Started Now !!
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img className="w-full max-w-xs md:max-w-md" src={HeaderImage} alt="Header img" />
        </div>
      </div>

    </nav>
  );
};

export default Welcome;
