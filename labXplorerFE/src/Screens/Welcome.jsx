// pages/index.js
import React from "react";
import HeaderImage from "../assets/solar.png";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <nav>
      <NavBar/>

      <div className="area flex items-center">
        <div className="flex flex-col px-20 w-2/3 items-start relative z-10">
          <h1 className="text-6xl font-bold mb-4">Learning By Doing</h1>
          <p className="text-xl mb-6">
            A Science and Technology Learning platfrom for students.
          </p>

          <Link to="/register" className="inline-flex px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg shadow-lg">
              Get Started Now !!
          </Link>
        </div>

        <div className="w-1/2 filter flex relative z-10">
          <img className="bg-transparent" src={HeaderImage} alt="Header img" />
        </div>
        {/* <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul> */}
      </div>

      {/* <Footer/> */}
    </nav>
  );
};

export default Welcome;
