import React from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizQuestionsProps {
  questions: Question[];
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ questions }) => {
  return (
    <div className="quiz-questions">
      <h2>Questions</h2>
      {questions.map((q, index) => (
        <div key={index} className="quiz-question">
          <p>
            <strong>Q{index + 1}:</strong> {q.question}
          </p>
          <ul>
            {q.options.map((option, idx) => (
              <li key={idx}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizQuestions;
