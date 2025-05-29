import QuizCard from "../quizecard/QuizCard";
import "./RecentSection.css";

import { getRecentQuizzes } from "../../utils/getRecentQuiz";
import { type Quiz } from "../../types/Quiz";
import { useEffect, useState } from "react";

function RecentSection() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const data = await getRecentQuizzes();
        console.log("loaded");
        console.log(data);
        setQuizzes(data);
      } catch (e) {
        setError("Failed to load quizzes.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, []);

  return (
    <div className="recent-section-wrap">
      <div className="recent-heading">Recent Quizzes</div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading quizzes...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <div className="recent-quizzes-wrap">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.quizId} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentSection;
