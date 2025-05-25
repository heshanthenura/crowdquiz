import "./QuizCard.css";
import DefaultImage from "../../assets/default-img.png";
import QuizType from "../quiztype/QuizType";

function QuizCard() {
  return (
    <div className="quiz-card-wrap">
      <img className="quiz-card-image" src={DefaultImage} alt="default img" />
      <div className="quiz-card-content">
        <h3 className="quiz-card-title">Quiz Title</h3>
        <p className="quiz-card-description">Quiz Description</p>
        <p className="quiz-card-author">Author</p>
        <p className="quiz-card-quiz-number">10</p>
        <div className="quiz-card-quiz-types">
          <QuizType text="MCQ" />
          <QuizType text="STRUCTURED" />
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
