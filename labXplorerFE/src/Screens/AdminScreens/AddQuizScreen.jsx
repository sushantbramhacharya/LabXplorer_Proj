import React, { useState } from 'react';
import axios from 'axios';

const AddQuizScreen = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [capsuleId, setCapsuleId] = useState('');
  const [options, setOptions] = useState([]);
  const [newOptionText, setNewOptionText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/quizzes', { title: quizTitle, capsule_id: capsuleId });
      const newQuizId = response.data.id;
      alert('Quiz created successfully!');

      // Add options to the newly created quiz
      await Promise.all(options.map(option =>
        axios.post('/api/options', { quiz_id: newQuizId, option_text: option.text, is_correct: option.isCorrect })
      ));
      alert('Options added successfully!');
    } catch (error) {
      alert('Error creating quiz or adding options.');
    }
  };

  const handleAddOption = () => {
    setOptions([...options, { text: newOptionText, isCorrect }]);
    setNewOptionText('');
    setIsCorrect(false);
  };

  return (
    <div className="p-6 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-20">
      <form onSubmit={handleQuizSubmit} className="mb-8">
        <h2 className="text-xl font-bold mb-4">Create Quiz</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Title:</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Capsule ID:</label>
          <input
            type="number"
            value={capsuleId}
            onChange={(e) => setCapsuleId(e.target.value)}
            className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <h2 className="text-xl  font-bold mb-4">Add Options</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Option Text:</label>
          <input
            type="text"
            value={newOptionText}
            onChange={(e) => setNewOptionText(e.target.value)}
            className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isCorrect}
            onChange={(e) => setIsCorrect(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-white">Is Correct?</label>
        </div>
        <button
          type="button"
          onClick={handleAddOption}
          className="bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600 transition duration-300"
        >
          Add Option
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Options:</h3>
          <ul>
            {options.map((option, index) => (
              <li key={index} className="mt-2">
                {option.text} {option.isCorrect && <span className="text-green-500">(Correct)</span>}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default AddQuizScreen;
