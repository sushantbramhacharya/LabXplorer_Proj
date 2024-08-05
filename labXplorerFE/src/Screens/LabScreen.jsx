import React, { useEffect } from 'react';
import NavBar from '../Components/NavBar';
import ChemistryLab from '../Components/Labs/PhysicsSim/GravitySim';
import Descriptor from '../Components/Descriptor';
import { Outlet } from 'react-router-dom';

const LabScreen = () => {
    // const experiment = {
    //     name: "Synthesis of Sodium Chloride",
    //     apparatus: [
    //       "Beaker (100 ml)",
    //       "Glass Stirring Rod",
    //       "Measuring Spoon",
    //       "Filtration Funnel",
    //       "Filter Paper"
    //     ],
    //     chemicals: [
    //       "Sodium Bicarbonate",
    //       "Hydrochloric Acid",
    //       "Distilled Water",
    //       "Sodium Chloride (for testing)"
    //     ],
    //     steps: [
    //       "1. Add 50 ml of distilled water to the beaker.",
    //       "2. Gradually add sodium bicarbonate to the water while stirring.",
    //       "3. Carefully add hydrochloric acid to the mixture and stir until the reaction is complete.",
    //       "4. Filter the resulting solution using the filtration funnel and filter paper.",
    //       "5. Evaporate the water from the filtrate to obtain sodium chloride crystals."
    //     ],
    //     safety: [
    //       "Wear safety goggles and gloves at all times.",
    //       "Handle hydrochloric acid with care; it is corrosive.",
    //       "Ensure proper ventilation during the experiment.",
    //       "Dispose of chemical waste according to safety guidelines.",
    //       "Avoid direct contact with chemicals and keep away from face."
    //     ]
    //   };
      
    
    return(<>
    <NavBar/>
    <h1 className='text-center text-2xl p-3 italic'>Gravity Simulator</h1>
    <div className='flex justify-center '>
    <Outlet/>
    {/* <Descriptor
        experimentName={experiment.name}
        apparatus={experiment.apparatus}
        steps={experiment.steps}
        safety={experiment.safety}
      /> */}
    </div>
    </>)
};

export default LabScreen;
