import React, { useState } from 'react';
import { Question, Course } from '../types';
import { MathText } from './LoadingSpinner';

interface QuizProps {
  course: Course;
  questions: Question[];
  onSubmit: (answers: { [key: number]: number }) => void;
}

const Quiz: React.FC<QuizProps> = ({ course, questions, onSubmit }) => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const allQuestionsAnswered = Object.keys(answers).length === questions.length;
  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allQuestionsAnswered) {
      onSubmit(answers);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Quiz Header */}
      <header className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {course.title}
        </h2>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
          Answer all {questions.length} questions to see your score
        </p>
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Progress: {Object.keys(answers).length}/{questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Quiz Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, qIndex) => (
          <div 
            key={qIndex} 
            className="bg-white dark:bg-slate-800 rounded-xl elevation-2 p-6 border-l-4 border-blue-500"
          >
            {/* Question Number Badge */}
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                {qIndex + 1}
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                <MathText text={q.question} />
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 ml-11">
              {q.options.map((option, oIndex) => {
                const optionLetters = ['A', 'B', 'C', 'D'];
                const isSelected = answers[qIndex] === oIndex;
                
                return (
                  <label
                    key={oIndex}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 elevation-1'
                        : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={oIndex}
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(qIndex, oIndex)}
                      className="hidden"
                    />
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center mr-3 font-bold text-sm ${
                      isSelected 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'border-gray-300 dark:border-gray-500 text-gray-500 dark:text-gray-400'
                    }`}>
                      {optionLetters[oIndex]}
                    </div>
                    <span className="flex-grow text-gray-800 dark:text-gray-200">
                      <MathText text={option} />
                    </span>
                    {isSelected && (
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-center pt-6 sticky bottom-4">
          <button
            type="submit"
            disabled={!allQuestionsAnswered}
            className={`px-10 py-4 rounded-full font-bold text-lg elevation-2 transition-all duration-300 ${
              allQuestionsAnswered
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transform hover:scale-105 elevation-3'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {allQuestionsAnswered ? (
              <span className="flex items-center">
                Submit Answers
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            ) : (
              `Answer all questions (${Object.keys(answers).length}/${questions.length})`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quiz;