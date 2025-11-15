import React from 'react';
import { QuizResult } from '../types';
import { MathText, Markdown } from './LoadingSpinner';

interface ResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onRetryCourse: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRestart, onRetryCourse }) => {
  const scorePercentage = Math.round((result.score / result.total) * 100);
  
  // Google Material Design colors
  const getScoreColor = () => {
    if (scorePercentage >= 80) return { text: 'text-green-600', bg: 'bg-green-600', light: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-500' };
    if (scorePercentage >= 60) return { text: 'text-blue-600', bg: 'bg-blue-600', light: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-500' };
    if (scorePercentage >= 40) return { text: 'text-yellow-600', bg: 'bg-yellow-600', light: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-500' };
    return { text: 'text-red-600', bg: 'bg-red-600', light: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-500' };
  };

  const scoreColors = getScoreColor();

  const getScoreMessage = () => {
    if (scorePercentage >= 90) return { emoji: '🎉', text: 'Outstanding!', desc: 'You have mastered this topic!' };
    if (scorePercentage >= 80) return { emoji: '🌟', text: 'Excellent!', desc: 'Great job on this quiz!' };
    if (scorePercentage >= 70) return { emoji: '👏', text: 'Well Done!', desc: 'You have a solid understanding!' };
    if (scorePercentage >= 60) return { emoji: '👍', text: 'Good Effort!', desc: 'Keep practicing to improve!' };
    if (scorePercentage >= 40) return { emoji: '📚', text: 'Keep Learning!', desc: 'Review the material and try again!' };
    return { emoji: '💪', text: 'Keep Trying!', desc: 'Practice makes perfect!' };
  };

  const message = getScoreMessage();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Score Card */}
      <header className="text-center mb-10 bg-white dark:bg-slate-800 rounded-2xl elevation-3 p-8 overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-500 rounded-full translate-x-20 translate-y-20"></div>
        </div>

        <div className="relative z-10">
          <div className="text-6xl mb-4">{message.emoji}</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{message.text}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{message.desc}</p>
          
          {/* Score Display */}
          <div className="inline-block">
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Your Score</p>
            <div className={`text-7xl font-bold ${scoreColors.text} mb-4`}>
              {result.score}<span className="text-4xl text-gray-400">/{result.total}</span>
            </div>
            <div className={`inline-block px-6 py-2 rounded-full ${scoreColors.light} ${scoreColors.text} font-bold text-xl`}>
              {scorePercentage}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className={`${scoreColors.bg} h-3 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${scorePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Feedback Section */}
      <div className="space-y-5">
        {result.feedback.map((item, index) => (
          <div 
            key={index} 
            className={`bg-white dark:bg-slate-800 rounded-xl elevation-2 overflow-hidden ${
              item.isCorrect ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
            }`}
          >
            {/* Header */}
            <div className={`p-4 ${item.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  item.isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {item.isCorrect ? (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg text-gray-900 dark:text-white">
                    Question {index + 1}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    <MathText text={item.question} />
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Details */}
            <div className="p-4">
              <div className="space-y-3">
                {/* Your Answer */}
                <div className={`flex items-start p-3 rounded-lg ${
                  item.isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/10' 
                    : 'bg-red-50 dark:bg-red-900/10'
                }`}>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 min-w-[100px]">
                    Your answer:
                  </span>
                  <span className={`font-semibold ${
                    item.isCorrect 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    <MathText text={item.userAnswer} />
                  </span>
                </div>

                {/* Correct Answer (if wrong) */}
                {!item.isCorrect && (
                  <div className="flex items-start p-3 rounded-lg bg-green-50 dark:bg-green-900/10">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 min-w-[100px]">
                      Correct answer:
                    </span>
                    <span className="font-semibold text-green-700 dark:text-green-300">
                      <MathText text={item.correctAnswer} />
                    </span>
                  </div>
                )}
              </div>

              {/* Explanation */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Explanation
                </h4>
                <div className="text-gray-700 dark:text-gray-300 text-sm">
                  <Markdown content={item.justification} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-10 flex flex-wrap justify-center gap-4">
        <button
          onClick={onRetryCourse}
          className="px-8 py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 font-bold rounded-full elevation-2 hover:elevation-3 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retry This Quiz
        </button>
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-full elevation-2 hover:elevation-3 transition-all duration-300 flex items-center transform hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Try Another Course
        </button>
      </div>
    </div>
  );
};

export default Results;