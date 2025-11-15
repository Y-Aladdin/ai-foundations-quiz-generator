
export interface Course {
  id: number;
  title: string;
  description: string;
  content: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizData {
  quiz: Question[];
}

export interface FeedbackItem {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  justification: string;
}

export interface QuizResult {
  score: number;
  total: number;
  feedback: FeedbackItem[];
}

export type AppState = 'selecting' | 'generating_quiz' | 'taking_quiz' | 'evaluating' | 'results' | 'error';
