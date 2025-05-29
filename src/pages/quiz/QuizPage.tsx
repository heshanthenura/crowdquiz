import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./QuizPage.css";
import NavBar from "../../components/navbar/NavBar";
import { getQuizById } from "../../utils/getQuizById";
import type { Quiz } from "../../types/Quiz";

function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;
      try {
        const data = await getQuizById(quizId);
        setQuiz(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  return (
    <>
      <NavBar />
      <div className="quiz-page-container">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading quiz...</p>
          </div>
        )}

        {!loading && quiz && (
          <div className="quiz-details">
            <h1 className="quiz-title">{quiz.title}</h1>
            <p className="quiz-description">{quiz.description}</p>

            <div className="quiz-meta">
              <p>
                <strong>Created By:</strong> {quiz.userName || "Anonymous"}
              </p>
              <p>
                <strong>Total Questions:</strong> {quiz.numberOfQuestions}
              </p>
              <p>
                <strong>Estimated Time:</strong> {quiz.time} minutes
              </p>
              <p>
                <strong>Quiz Type:</strong> {quiz.quizType.join(", ")}
              </p>
            </div>

            <a href={`/attempt/${quiz.quizId}`} className="attempt-quiz-btn">
              Start Quiz
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default QuizPage;
