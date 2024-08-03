import React from 'react';

const Descriptor = ({ experimentName, apparatus, steps,safety }) => {
  return (
    <div className="mx-2 p-4 bg-slate-900 w-[18vw] text-white rounded-lg shadow-lg h-[85vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-2 p-3 rounded-md">{experimentName}</h2>
      
      <div className="mb-4 p-3 rounded-md">
        <h3 className="text-lg font-semibold mb-1  ">Apparatus Required:</h3>
        <ul className="list-disc list-inside pl-4">
          {apparatus.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>
      <div className=' p-3 rounded-md'>
        <h3 className="text-lg font-semibold mb-1">Steps:</h3>
        <ol className="list-decimal list-inside pl-4">
          {steps.map((step, index) => (
            <li key={index} className="mb-1">{step}</li>
          ))}
        </ol>
      </div>
          {safety?<div>
        <h3 className="text-lg font-semibold mb-1">Safety:</h3>
        <ul className="list-disc list-inside pl-4">
          {safety.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>:<></>
      }
    
    </div>
    
  );
};

export default Descriptor;
