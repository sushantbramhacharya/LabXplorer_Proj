import React from 'react';

const SimulationList = ({ simulations }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Simulations List</h2>
      <div className="space-y-4">
        {simulations.map((sim, index) => (
          <div key={index} className="bg-slate-600 p-4 rounded-lg shadow-md">
            <h3 className="bg-transparent text-xl font-semibold mb-2">{sim.name}</h3>
            <p className="bg-transparent text-white mb-2">{sim.description}</p>
            <a
              href={sim.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent text-blue-500 hover:underline"
            >
              {sim.link}
            </a>
            <div className="mt-2 bg-transparent">
              <span className="bg-transparent bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm">
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
