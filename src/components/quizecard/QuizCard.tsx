import "./QuizCard.css";
import DefaultImage from "../../assets/default-img.png";
import type { Quiz } from "../../types/Quiz";
import QuizType from "../quiztype/QuizType";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  quiz: Quiz;
}

function QuizCard({ quiz }: QuizCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quiz/${quiz.quizId}`);
  };

  return (
    <div
      className="quiz-card-wrap"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img className="quiz-card-image" src={DefaultImage} alt="default img" />
      <div className="quiz-card-content">
        <h3 className="quiz-card-title">{quiz.title}</h3>
        <p className="quiz-card-description">{quiz.description}</p>
        <p className="quiz-card-author">{quiz.userName}</p>
        <p className="quiz-card-quiz-number">
          {quiz.numberOfQuestions} Questions
        </p>
        <p className="quiz-card-time">Time: {quiz.time} minutes</p>
        <div className="quiz-card-quiz-types">
          {quiz.quizType.map((type, index) => (
            <QuizType key={`${type}-${index}`} text={type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
