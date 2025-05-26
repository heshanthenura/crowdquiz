import "./QuizCard.css";
import DefaultImage from "../../assets/default-img.png";
import QuizType from "../quiztype/QuizType";
import { useNavigate } from "react-router-dom";

export interface QuizData {
  id: string;
  title: string;
  description: string;
  author: { name: string; email?: string };
  questionCount: number;
  timeLimit: number;
}

interface QuizCardProps {
  quiz: QuizData;
}

function QuizCard({ quiz }: QuizCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <div className="quiz-card-wrap" onClick={handleCardClick}>
      <img className="quiz-card-image" src={DefaultImage} alt="default img" />
      <div className="quiz-card-content">
        <h3 className="quiz-card-title">{quiz.title}</h3>
        <p className="quiz-card-description">{quiz.description}</p>
        <p className="quiz-card-author">{quiz.author?.name || "Anonymous"}</p>
        <p className="quiz-card-quiz-number">{quiz.questionCount} questions</p>
        <p className="quiz-card-time">Time: {quiz.timeLimit} minutes</p>
        <div className="quiz-card-quiz-types">
          <QuizType text="MCQ" /> {/* Placeholder for now */}
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
