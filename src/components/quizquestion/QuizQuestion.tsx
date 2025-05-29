import type { Question } from "../../types/ValidationResult";
import "./QuizQuestion.css";

interface QuizQuestionProps {
  question: Question;
  isQuizOver: boolean;
  selectedAnswerIndex: number | null;
  onAnswerSelected: (answerIndex: number | null) => void;
}

function QuizQuestion({
  question,
  isQuizOver,
  selectedAnswerIndex,
  onAnswerSelected,
}: QuizQuestionProps) {
  const handleSelect = (index: number) => {
    if (!isQuizOver) {
      if (selectedAnswerIndex === index) {
        // Deselect if clicking the already selected answer
        onAnswerSelected(null);
      } else {
        onAnswerSelected(index);
      }
    }
  };

  const noSelection = selectedAnswerIndex === null && isQuizOver;

  return (
    <div className={`quiz-question-wrap ${noSelection ? "no-selection" : ""}`}>
      <h3 className="quiz-question-title">{question.question}</h3>
      <div className="quiz-answers">
        {question.answers.map((option, index) => {
          let btnClass = "quiz-answer-btn";

          if (isQuizOver) {
            if (index === selectedAnswerIndex) {
              btnClass += option.isCorrect
                ? " selected correct"
                : " selected wrong";
            } else if (option.isCorrect) {
              btnClass += " correct-unselected";
            }
          } else if (index === selectedAnswerIndex) {
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
