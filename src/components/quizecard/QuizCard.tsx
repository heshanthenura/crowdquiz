import "./QuizCard.css";
import DefaultImage from "../../assets/default-img.png";
import QuizType from "../quiztype/QuizType";

interface QuizData {
  id: string;
  title: string;
  description: string;
  author: { name: string };
  questionCount: number;
}

interface QuizCardProps {
  quiz: QuizData;
}

function QuizCard({ quiz }: QuizCardProps) {
  return (
    <div className="quiz-card-wrap">
      <img className="quiz-card-image" src={DefaultImage} alt="default img" />
      <div className="quiz-card-content">
        <h3 className="quiz-card-title">{quiz.title}</h3>
        <p className="quiz-card-description">{quiz.description}</p>
        <p className="quiz-card-author">{quiz.author?.name || "Anonymous"}</p>
        <p className="quiz-card-quiz-number">{quiz.questionCount}</p>
        <div className="quiz-card-quiz-types">
          <QuizType text="MCQ" /> {/* Placeholder for now */}
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
