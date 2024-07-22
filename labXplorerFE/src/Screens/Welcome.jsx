// pages/index.js
import React from "react";
import HeaderImage from "../assets/home_image_mono.png";
import NavBar from "../Components/NavBar";

const Welcome = () => {
  return (
    <nav>
      <NavBar/>

      <div className="area flex items-center">
        <div className="flex flex-col px-20 w-2/3 items-start relative z-10">
          <h1 className="text-6xl font-bold mb-4">Learning By Doing</h1>
          <p className="text-xl mb-6">
            Explore Science and Technology Through Simulations and Experiments
          </p>

          <a href="/register" className="inline-flex px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg shadow-lg">
              Get Started Now !!
          </a>
        </div>

        <div className="w-1/4 filter flex relative z-10">
          <img src={HeaderImage} alt="Header img" />
        </div>
        <ul className="circles">
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
        </ul>
      </div>

      {/* <Footer/> */}
    </nav>
  );
};

export default Welcome;
