import React from 'react';
import NavBar from '../Components/NavBar';

const AboutScreen = () => {
  return (
    <>
      <NavBar />
      <div className="p-8 min-h-screen bg-gray-900">
        <div className="max-w-4xl mx-auto text-gray-300 shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-4">
            About LabXplorer
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Welcome to LabXplorer, the ultimate virtual learning environment designed to bring science experiments to life! Our platform offers an engaging way for students to explore and understand fundamental concepts in various scientific fields through interactive simulations and experiments.
          </p>

          <section className="mb-6">
            <h2 className="text-3xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-400 mb-3">
              Our Mission
            </h2>
            <p className="text-lg text-gray-200">
              At LabXplorer, our mission is to make learning science fun and accessible for students of all ages. By providing a range of virtual experiments and interactive labs, we aim to foster curiosity and a deeper understanding of scientific principles in a hands-on manner.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-3xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-400 mb-3">
              Features
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-200">
              <li>Virtual experiments in Chemistry, Physics, Electronics, and Astronomy.</li>
              <li>Interactive simulations to enhance understanding through practice.</li>
              <li>Personalized student profiles to track progress and achievements.</li>
              <li>Teacher tools for creating and managing experiments and assignments.</li>
              <li>A collaborative forum for students and teachers to discuss and share ideas.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-3xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-400 mb-3">
              Our Team
            </h2>
            <p className="text-lg text-gray-200">
              Our team consists of passionate educators, developers, and designers dedicated to creating a top-notch educational platform. We are committed to continuous improvement and innovation to provide the best learning experience possible.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-3xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-400 mb-3">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-200">
              If you have any questions, feedback, or just want to say hello, feel free to <a href="mailto:support@labxplorer.com" className="text-blue-300 hover:underline">email us</a>. We’d love to hear from you!
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default AboutScreen;
