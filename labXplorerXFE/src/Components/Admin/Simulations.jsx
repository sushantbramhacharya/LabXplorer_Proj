import React from 'react';

const SimulationList = ({ simulations }) => {
  return (
    <div className="p-6">
      
      <div className="space-y-4">
        {simulations.map((sim, index) => (
          <div key={index} className="bg-slate-600  p-4 rounded-lg shadow-md">
            <h3 className="bg-transparent text-xl font-semibold mb-2">{sim.name}</h3>
            <p className="bg-transparent text-white mb-2">{sim.description}</p>
            <a
              href={sim.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 p-2 my-2 rounded-lg inline-block  text-white hover:bg-green-400"
            >
              Open Simulator
            </a>
            <div className="mt-2 bg-transparent">
              <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm">
                {sim.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimulationList;
