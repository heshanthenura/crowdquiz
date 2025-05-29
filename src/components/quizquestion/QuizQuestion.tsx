import { useState } from "react";
import type { Question } from "../../types/ValidationResult";
import "./QuizQuestion.css";

interface QuizQuestionProps {
  question: Question;
  isQuizOver: boolean;
}

function QuizQuestion({ question, isQuizOver }: QuizQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (!isQuizOver) {
      setSelectedIndex(selectedIndex === index ? null : index);
    }
  };

  const noSelection = selectedIndex === null && isQuizOver;

  return (
    <div className={`quiz-question-wrap ${noSelection ? "no-selection" : ""}`}>
      <h3 className="quiz-question-title">{question.question}</h3>
      <div className="quiz-answers">
        {question.answers.map((option, index) => {
          let btnClass = "quiz-answer-btn";

          if (isQuizOver) {
            if (index === selectedIndex) {
              btnClass += option.isCorrect
                ? " selected correct"
                : " selected wrong";
            } else if (option.isCorrect) {
              btnClass += " correct-unselected";
            }
          } else if (index === selectedIndex) {
            btnClass += " selected";
          }

          return (
            <div className="answer-wrap" key={index}>
              <button
                className={btnClass}
                onClick={() => handleSelect(index)}
                disabled={isQuizOver}
              >
                {option.text}
              </button>
            </div>
          );
        })}
      </div>

      {noSelection && (
        <div className="no-selection-message">You didn't select an answer!</div>
      )}
    </div>
  );
}

export default QuizQuestion;
