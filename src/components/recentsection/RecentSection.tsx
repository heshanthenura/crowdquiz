import "./RecentSection.css";
import QuizCard from "../quizecard/QuizCard";

function RecentSection() {
  return (
    <div className="recent-section-wrap">
      <div className="recent-heading">Recent Quizzes</div>
      <div className="recent-quizzes-wrap">
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </div>
    </div>
  );
}

export default RecentSection;
