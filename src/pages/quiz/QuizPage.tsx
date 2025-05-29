import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./QuizPage.css";
import NavBar from "../../components/navbar/NavBar";
import { getQuizById } from "../../utils/getQuizById";
import type { Quiz } from "../../types/Quiz";
import QuizQuestion from "../../components/quizquestion/QuizQuestion";
import type { Question } from "../../types/ValidationResult";

function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds

  // Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;
      try {
        const data = await getQuizById(quizId);
        setQuiz(data);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Start or finish quiz
  const startQuiz = () => {
    if (isQuizStarted) {
      setIsQuizOver(true);
    } else {
      if (quiz?.time) {
        setTimeLeft(quiz.time * 60); // Convert minutes to seconds
      }
      setIsQuizStarted(true);
    }
  };

  useEffect(() => {
    if (!isQuizStarted || isQuizOver || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsQuizOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizStarted, isQuizOver, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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
                <strong>Time:</strong> {quiz.time} minutes
              </p>
              <p>
                <strong>Quiz Type:</strong> {quiz.quizType.join(", ")}
              </p>
            </div>

            <a className="attempt-quiz-btn" onClick={startQuiz}>
              {isQuizStarted ? "Finish Quiz" : "Start Quiz"}
            </a>
          </div>
        )}
      </div>

      {isQuizStarted && (
        <div className="timer-container">
          <div className="timer-text">⏱ Time Left: {formatTime(timeLeft)}</div>
          <div
            className="timer-progress-bar"
            style={{
              width: `${(timeLeft / (quiz!.time * 60)) * 100}%`,
              backgroundColor:
                timeLeft / (quiz!.time * 60) > 0.5
                  ? "#4caf50"
                  : timeLeft / (quiz!.time * 60) > 0.25
                  ? "#ffc107"
                  : "#f44336",
            }}
          ></div>
        </div>
      )}

      {isQuizStarted && (
        <div className="quiz-container-wrap">
          {quiz?.questions.map((question: Question, index: number) => (
            <QuizQuestion
              key={index}
              question={question}
              isQuizOver={isQuizOver}
            />
          ))}

          {!isQuizOver && (
            <div className="bottom-finish-btn-container">
              <button className="attempt-quiz-btn" onClick={startQuiz}>
                Finish Quiz
              </button>
            </div>
          )}

          <button
            className="go-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ⬆ Top
          </button>
        </div>
      )}
    </>
  );
}

export default QuizPage;
