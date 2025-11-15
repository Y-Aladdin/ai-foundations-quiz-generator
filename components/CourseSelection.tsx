
import React from 'react';
import { Course } from '../types';
import { COURSES } from '../constants';

interface CourseSelectionProps {
  onSelectCourse: (course: Course) => void;
}

// Google Material Design colors for course cards
const googleColors = [
  { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-500', text: 'text-blue-700 dark:text-blue-300', hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30' },
  { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-500', text: 'text-red-700 dark:text-red-300', hover: 'hover:bg-red-100 dark:hover:bg-red-900/30' },
  { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-500', text: 'text-green-700 dark:text-green-300', hover: 'hover:bg-green-100 dark:hover:bg-green-900/30' },
  { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-500', text: 'text-yellow-700 dark:text-yellow-300', hover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30' },
  { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-500', text: 'text-purple-700 dark:text-purple-300', hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30' },
  { bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-500', text: 'text-indigo-700 dark:text-indigo-300', hover: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/30' },
  { bg: 'bg-pink-50 dark:bg-pink-900/20', border: 'border-pink-500', text: 'text-pink-700 dark:text-pink-300', hover: 'hover:bg-pink-100 dark:hover:bg-pink-900/30' },
  { bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-500', text: 'text-teal-700 dark:text-teal-300', hover: 'hover:bg-teal-100 dark:hover:bg-teal-900/30' },
];

const CourseCard: React.FC<{ course: Course; onSelect: () => void; colorIndex: number }> = ({ course, onSelect, colorIndex }) => {
  const colors = googleColors[colorIndex % googleColors.length];
  
  return (
    <div
      onClick={onSelect}
      className={`${colors.bg} ${colors.hover} rounded-2xl elevation-2 hover:elevation-3 p-6 transition-all duration-300 cursor-pointer border-l-4 ${colors.border} transform hover:-translate-y-1`}
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.border.replace('border', 'bg')} flex items-center justify-center text-white font-bold text-lg`}>
          {course.id}
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${colors.text} mb-2`}>
            {course.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {course.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end">
        <span className={`text-sm font-medium ${colors.text} flex items-center`}>
          Start Quiz
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

const CourseSelection: React.FC<CourseSelectionProps> = ({ onSelectCourse }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Choose Your Course
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Test your knowledge across 8 comprehensive AI Foundations courses. Select a course below to begin your quiz!
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {COURSES.map((course, index) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onSelect={() => onSelectCourse(course)} 
            colorIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSelection;
