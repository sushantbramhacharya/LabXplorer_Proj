import React, { useState } from 'react';
import { useAllSimulationQuery, useSetSimulationMutation } from '../../api/simulationApi'; // Import RTK Query hooks
import SimulationForm from '../../Components/Admin/SimulationForm';
import SimulationList from '../../Components/Admin/Simulations';
import NavBar from '../../Components/NavBar';
import { useSelector } from 'react-redux';

const SimulationScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use RTK Query hook to fetch simulations
  const { data: simulations = [], isLoading, isError, refetch } = useAllSimulationQuery();
  const {user} = useSelector((state)=>state.userSlice);
  const [setSimulation] = useSetSimulationMutation();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (formData) => {
    try {
      await setSimulation(formData).unwrap();
      refetch();

      handleCloseModal();
    } catch (error) {
      console.error('Failed to save simulation: ', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching simulations</p>;

  return (
    <>
    <NavBar/>
    
    <div className="p-6 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-20">
      {user?.email==="admin@labxplorerx.com"?<button
        onClick={handleOpenModal}
        className="bg-slate-500 float-right text-white py-2 px-4 rounded-md hover:bg-slate-600 transition duration-300"
      >
        Add Simulation
      </button>:<></>}
      

      {isModalOpen && (
        <SimulationForm onClose={handleCloseModal} onSubmit={handleFormSubmit} />
      )}
<h2 className="text-2xl font-bold mb-4">Simulations List</h2>
      <SimulationList simulations={simulations} />
    </div>

    </>
  );
};

export default SimulationScreen;
