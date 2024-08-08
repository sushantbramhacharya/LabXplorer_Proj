import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const QuizScreen = () => {
  const { capsuleId } = useParams(); // Extract capsuleId from the route parameters
  const [quizzes, setQuizzes] = useState([]); // State to store the array of quizzes
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // Track which quiz is currently displayed
  const [selectedAnswer, setSelectedAnswer] = useState(null); // State to track the selected answer
  const [score, setScore] = useState(0); // State to track the user's score
  const [showResult, setShowResult] = useState(false); // State to show the result after the quiz

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/capsule/quizes?id=${capsuleId}`);
        setQuizzes(response.data); // Set the quizzes data
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [capsuleId]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (quizzes.length > 0 && selectedAnswer !== null) {
      const currentQuiz = quizzes[currentQuizIndex];
      const correctAnswer = currentQuiz.options.find(option => option.is_correct);

      if (selectedAnswer === correctAnswer.option_text) {
        setScore(score + 1); // Increment score if the answer is correct
      }

      if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1); // Move to the next quiz
        setSelectedAnswer(null); // Reset selected answer for the next quiz
      } else {
        setShowResult(true); // Show result if it's the last quiz
      }
    }
  };

  if (quizzes.length === 0) return <div>Loading quiz...</div>;

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <>
    <div className="p-6 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-20">
    <h1 className='text-4xl font-semibold text-center mb-10 underline'>Welcome to LabXplorer Quiz</h1>
      {showResult ? (
        <div className="bg-transparent p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
          <p className="text-lg">Your score: {score} / {quizzes.length}</p>
        </div>
      ) : (
        <div className="bg-transparent p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{currentQuiz.title}</h2>
          <div className="space-y-4">
            {currentQuiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(option.option_text)}
                className={`block w-full text-left p-2 border rounded-md ${
                  selectedAnswer === option.option_text ? 'bg-blue-500 text-white' : 'bg-slate-900'
                }`}
              >
                {option.option_text}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            {currentQuizIndex < quizzes.length - 1 ? 'Next' : 'Submit'}
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default QuizScreen;
