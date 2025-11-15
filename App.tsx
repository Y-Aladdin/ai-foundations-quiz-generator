import React, { useState, useCallback } from 'react';
import { AppState, Course, Question, QuizResult } from './types';
import CourseSelection from './components/CourseSelection';
import Quiz from './components/Quiz';
import Results from './components/Results';
import LoadingSpinner from './components/LoadingSpinner';
import { generateQuiz, evaluateAnswers } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('selecting');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectCourse = useCallback(async (course: Course) => {
    setSelectedCourse(course);
    setAppState('generating_quiz');
    setError(null);
    try {
      const questions = await generateQuiz(course);
      setQuizQuestions(questions);
      setAppState('taking_quiz');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState('error');
    }
  }, []);

  const handleRetryCourse = useCallback(async () => {
    if (!selectedCourse) return;
    setAppState('generating_quiz');
    setError(null);
    try {
      const questions = await generateQuiz(selectedCourse);
      setQuizQuestions(questions);
      setAppState('taking_quiz');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState('error');
    }
  }, [selectedCourse]);

  const handleQuizSubmit = useCallback(async (answers: { [key: number]: number }) => {
    if (!selectedCourse || quizQuestions.length === 0) return;
    setAppState('evaluating');
    setError(null);
    try {
      const result = await evaluateAnswers(selectedCourse, quizQuestions, answers);
      setQuizResult(result);
      setAppState('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState('error');
    }
  }, [selectedCourse, quizQuestions]);

  const handleRestart = useCallback(() => {
    setAppState('selecting');
    setSelectedCourse(null);
    setQuizQuestions([]);
    setQuizResult(null);
    setError(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'selecting':
        return <CourseSelection onSelectCourse={handleSelectCourse} />;
      case 'generating_quiz':
        return <LoadingSpinner message="Generating your quiz..." />;
      case 'taking_quiz':
        return <Quiz course={selectedCourse!} questions={quizQuestions} onSubmit={handleQuizSubmit} />;
      case 'evaluating':
        return <LoadingSpinner message="Evaluating your answers..." />;
      case 'results':
        return <Results result={quizResult!} onRestart={handleRestart} onRetryCourse={handleRetryCourse} />;
      case 'error':
        return (
          <div className="text-center max-w-lg mx-auto bg-white dark:bg-slate-800 rounded-2xl elevation-3 p-8">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-full elevation-2 hover:elevation-3 transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Google-style header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 elevation-1 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4285f4"/>
                <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#34a853"/>
                <path opacity="0.7" d="M2 12L12 17L22 12V7L12 12L2 7V12Z" fill="#fbbc04"/>
              </svg>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                  AI Foundations Quiz
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Google AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300 font-medium">Google AI Studio</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto">
          {renderContent()}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 Google AI. Built with Gemini API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;