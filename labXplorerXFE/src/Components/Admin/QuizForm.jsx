import React, { useState, useEffect } from 'react';

const QuizForm = ({ capsuleId, quiz, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    capsuleId,
    questions: quiz ? quiz.map(q => ({
      ...q,
      options: q.options || [{ option_text: '', is_correct: false }],
    })) : [{ title: '', options: [{ option_text: '', is_correct: false }], correctAnswerIndex: null }],
  });

  useEffect(() => {
    if (quiz) {
      setFormData({
        capsuleId,
        questions: quiz.map(q => ({
          ...q,
          options: q.options || [{ option_text: '', is_correct: false }],
        })),
      });
    }
  }, [quiz, capsuleId]);

  const handleChange = (e, questionIndex, optionIndex = null) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];

    if (optionIndex !== null) {
      updatedQuestions[questionIndex].options[optionIndex][name] = value;
    } else {
      updatedQuestions[questionIndex][name] = value;
    }

    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { title: '', options: [{ option_text: '', is_correct: false }], correctAnswerIndex: null }],
    });
  };

  const handleRemoveQuestion = (index) => {
    const questions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push({ option_text: '', is_correct: false });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].correctAnswerIndex = optionIndex;
    updatedQuestions[questionIndex].options.forEach((opt, i) => {
      opt.is_correct = i === optionIndex;
    });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const validateForm = () => {
    return formData.questions.every(
      q => q.title && q.options.length > 1 && q.correctAnswerIndex !== null && q.options.every(opt => opt.option_text)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    } else {
      alert('Please fill in all required fields and ensure each question has at least two options with one correct answer.');
    }
  };

  if (!formData.questions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {quiz ? 'Edit Quiz' : 'Create Quiz'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {formData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-6 p-4 bg-gray-900 rounded-lg">
            <div className="mb-4">
              <label
                htmlFor={`question-${questionIndex}`}
                className="block text-gray-300 text-lg font-semibold pb-2"
              >
                Question {questionIndex + 1} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`question-${questionIndex}`}
                name="title"
                className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
                value={question.title}
                onChange={(e) => handleChange(e, questionIndex)}
                required
              />
            </div>

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-4">
                <label
                  htmlFor={`option-${questionIndex}-${optionIndex}`}
                  className="block text-gray-300 text-lg font-semibold pb-2"
                >
                  Option {optionIndex + 1} <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id={`option-${questionIndex}-${optionIndex}`}
                    name="option_text"
                    className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
                    value={option.option_text}
                    onChange={(e) => handleChange(e, questionIndex, optionIndex)}
                    required
                  />
                  <input
                    type="radio"
                    id={`correct-${questionIndex}-${optionIndex}`}
                    name={`correctAnswer-${questionIndex}`}
                    className="ml-4"
                    checked={question.correctAnswerIndex === optionIndex}
                    onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                  />
                  <label
                    htmlFor={`correct-${questionIndex}-${optionIndex}`}
                    className="ml-2 text-gray-400"
                  >
                    Correct Answer
                  </label>
                  <button
                    type="button"
                    className="ml-4 bg-red-600 text-white p-2 rounded-lg shadow hover:bg-red-700 transition-colors"
                    onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                    disabled={question.options.length <= 1}
                  >
                    Remove Option
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end mb-4">
              <button
                type="button"
                className="bg-green-600 text-white p-2 rounded-lg shadow hover:bg-green-700 transition-colors"
                onClick={() => handleAddOption(questionIndex)}
              >
                Add Option
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-600 text-white p-2 rounded-lg shadow hover:bg-red-700 transition-colors"
                onClick={() => handleRemoveQuestion(questionIndex)}
              >
                Remove Question
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end mb-6">
          <button
            type="button"
            className="bg-green-600 text-white p-3 rounded-lg shadow hover:bg-green-700 transition-colors"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>

        <div className="flex pt-4 justify-end gap-4">
          <button
            type="button"
            className="bg-gray-600 text-white p-3 rounded-lg shadow hover:bg-gray-700 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Save Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
