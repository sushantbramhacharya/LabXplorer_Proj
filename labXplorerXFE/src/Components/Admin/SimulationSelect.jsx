// SimulatorSelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';

const SimulatorSelect = ({ value, onChange }) => {
  const [simulators, setSimulators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSimulators = async () => {
      try {
        const response = await axios.get(BASE_URL+'/admin/simulations'); 
        setSimulators(response.data);
      } catch (error) {
        console.error('Error fetching simulators:', error);
      }
    };

    fetchSimulators();
  }, []);

  const filteredSimulators = simulators.filter(simulator =>
    simulator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-4 col-span-2">
      <label htmlFor="simulators" className="block text-gray-300 text-lg font-semibold pb-2">
        Simulators
      </label>
      <input
        type="text"
        placeholder="Search simulators..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
      />
      <select
        id="simulators"
        name="simulators"
        className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
        value={value}
        onChange={onChange}
      >
        <option value="None">None</option>
        {filteredSimulators.map((sim, index) => (
          <option key={index} value={sim.id}>
            {sim.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SimulatorSelect;
