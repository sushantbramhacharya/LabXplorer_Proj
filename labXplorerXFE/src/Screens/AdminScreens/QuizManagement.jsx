import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizForm from '../../Components/Admin/QuizForm';
import { BASE_URL } from '../../constants';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const QuizContainer = () => {
    const {capsuleId}=useParams()
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch quiz data with Axios
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/capsule/quizes?id=${capsuleId}`);
        console.log(response.data)
        setQuiz(response.data); // Assuming response.data is the quiz object
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [capsuleId]);

  const handleSaveQuiz = (formData) => {
    // Prepare the data for the PUT request
    const payload = {
      capsuleId: formData.capsuleId, // Extract capsuleId from formData
      questions: formData.questions   // Extract questions from formData
    };
    
    // Prepare the URL for the PUT request
    const url = `${BASE_URL}/capsule/quizes`;
  
    // Make the PUT request to save the quiz
    axios.put(url, payload)
      .then(response => {
        console.log('Quiz saved:', response.data);
        // Optionally handle successful save here
        alert('Sucessfully Saved Quiz');
      })
      .catch(error => {
        alert('Failed to Save Quiz');
        // Optionally handle errors here
      });
  };
  


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <QuizForm 
      capsuleId={capsuleId} 
      quiz={quiz} 
      onSave={handleSaveQuiz} 
    />
  );
};

export default QuizContainer;
