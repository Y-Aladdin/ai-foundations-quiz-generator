import { GoogleGenAI, Type } from "@google/genai";
import { Course, Question, QuizData, FeedbackItem, QuizResult } from '../types';

// Initialize GoogleGenAI with apiKey from environment variables, assuming it's available as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = 'gemini-2.5-flash';

// Implement generateQuiz function to call the Gemini API and generate questions.
export const generateQuiz = async (course: Course): Promise<Question[]> => {
    const prompt = `
        Based on the following course content, generate a 5-question multiple-choice quiz.
        Each question must have 4 options.
        Indicate the correct answer index (0-3).
        The questions should test understanding of the key concepts presented.

        Course Content:
        ---
        ${course.content}
        ---
    `;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    quiz: {
                        type: Type.ARRAY,
                        description: 'An array of 5 quiz questions.',
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: {
                                    type: Type.STRING,
                                    description: 'The quiz question.'
                                },
                                options: {
                                    type: Type.ARRAY,
                                    description: 'An array of 4 possible answers.',
                                    items: { type: Type.STRING }
                                },
                                correctAnswerIndex: {
                                    type: Type.NUMBER,
                                    description: 'The 0-based index of the correct answer in the options array.'
                                }
                            },
                            required: ['question', 'options', 'correctAnswerIndex']
                        }
                    }
                },
                required: ['quiz']
            }
        }
    });

    const jsonString = response.text;
    const quizData = JSON.parse(jsonString) as QuizData;
    
    if (!quizData.quiz || !Array.isArray(quizData.quiz)) {
      throw new Error("Invalid quiz data format from API.");
    }
    
    return quizData.quiz;
};

// Implement evaluateAnswers function to call the Gemini API and evaluate user's answers.
export const evaluateAnswers = async (
    course: Course,
    questions: Question[],
    answers: { [key: number]: number }
): Promise<QuizResult> => {
    
    const userAnswers = questions.map((q, index) => ({
        question: q.question,
        userAnswer: q.options[answers[index]],
        correctAnswer: q.options[q.correctAnswerIndex]
    }));
    
    const prompt = `
        A student has taken a quiz based on the course content provided.
        Evaluate their answers and provide a brief, encouraging justification for each, explaining why the chosen answer is right or wrong and what the correct concept is.
        The justification should be in Markdown format.

        Course Content:
        ---
        ${course.content}
        ---

        Quiz questions and student's answers:
        ---
        ${JSON.stringify(userAnswers, null, 2)}
        ---
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    feedback: {
                        type: Type.ARRAY,
                        description: 'An array of feedback items for each question.',
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                userAnswer: { type: Type.STRING },
                                correctAnswer: { type: Type.STRING },
                                isCorrect: { type: Type.BOOLEAN },
                                justification: {
                                    type: Type.STRING,
                                    description: 'Explanation in Markdown format.'
                                }
                            },
                            required: ['question', 'userAnswer', 'correctAnswer', 'isCorrect', 'justification']
                        }
                    }
                },
                required: ['feedback']
            }
        }
    });

    const jsonString = response.text;
    const evaluationResult = JSON.parse(jsonString) as { feedback: FeedbackItem[] };

    if (!evaluationResult.feedback || !Array.isArray(evaluationResult.feedback)) {
        throw new Error("Invalid feedback data format from API.");
    }

    const score = evaluationResult.feedback.filter(item => item.isCorrect).length;

    return {
        score: score,
        total: questions.length,
        feedback: evaluationResult.feedback
    };
};
