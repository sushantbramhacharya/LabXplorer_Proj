import React, { useState } from 'react';
import ExperimentCanvas from './ExpirementCanvas';

const ExperimentEditor = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [experimentData, setExperimentData] = useState({});
  const [selectedTool, setSelectedTool] = useState(null);

  const handleSave = () => {
    const experiment = {
      title,
      description,
      data: experimentData,
    };
    console.log('Saving experiment:', experiment);
  };

  const handleToolClick = (type) => {
    setSelectedTool(type);
  };

  return (
    <div className="flex h-screen">
      <div id="toolbox" className="w-24 bg-gray-200 p-4">
        <div
          className={`tool mb-2 p-2 cursor-pointer ${selectedTool === 'object' ? 'bg-blue-300' : 'bg-gray-300'}`}
          onClick={() => handleToolClick('object')}
        >
          Object
        </div>
        <div
          className={`tool mb-2 p-2 cursor-pointer ${selectedTool === 'text' ? 'bg-blue-300' : 'bg-gray-300'}`}
          onClick={() => handleToolClick('text')}
        >
          Text
        </div>
        <div
          className={`tool p-2 cursor-pointer ${selectedTool === 'move' ? 'bg-blue-300' : 'bg-gray-300'}`}
          onClick={() => handleToolClick('move')}
        >
          Move
        </div>
      </div>
      <div className="flex-1 flex">
        <ExperimentCanvas setExperimentData={setExperimentData} selectedTool={selectedTool} />
      </div>
      <div id="properties-panel" className="w-48 bg-gray-200 p-4">
        <h3 className="text-lg mb-4">Properties</h3>
        <div id="properties"></div>
      </div>
      <div className="w-24 bg-gray-200 p-4">
        <button
          onClick={handleSave}
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ExperimentEditor;
