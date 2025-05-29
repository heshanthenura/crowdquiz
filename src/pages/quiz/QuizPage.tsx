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
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  // Allow null to represent no selection
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);

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

  useEffect(() => {
    if (quiz) {
      setSelectedAnswers(new Array(quiz.questions.length).fill(null));
    }
  }, [quiz]);

  useEffect(() => {
    if (isQuizStarted && quiz && !isQuizOver) {
      const totalSeconds = quiz.time * 60;
      setTimeLeft(totalSeconds);
      setTotalTime(totalSeconds);

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
    }
    if (isQuizOver) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isQuizStarted, quiz, isQuizOver]);

  const startQuiz = () => {
    if (isQuizStarted) {
      setIsQuizOver(true);
    } else {
      setIsQuizStarted(true);
    }
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getProgressBarStyle = () => {
    if (!totalTime) return {};

    const percentage = (timeLeft / totalTime) * 100;

    let backgroundColor = "#4caf50"; // green
    if (percentage <= 25) {
      backgroundColor = "#f44336"; // red
    } else if (percentage <= 50) {
      backgroundColor = "#ffc107"; // yellow
    }

    return {
      width: `${percentage}%`,
      backgroundColor,
    };
  };

  const getTimerTextColor = () => {
    if (!totalTime) return "#333";
    const percentage = (timeLeft / totalTime) * 100;

    if (percentage <= 25) return "#f44336";
    if (percentage <= 50) return "#ffc107";
    return "#4caf50";
  };

  // Handle answer selection from QuizQuestion, allow deselect with null
  const handleAnswerSelected = (
    questionIndex: number,
    answerIndex: number | null
  ) => {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] = answerIndex;
      return updated;
    });
  };

  // Calculate how many answers are correct
  const correctCount: number = quiz
    ? selectedAnswers.reduce((count: number, selectedIndex, i) => {
        const question = quiz.questions[i];
        if (
          selectedIndex !== null &&
          question &&
          question.answers[selectedIndex]?.isCorrect
        ) {
          return count + 1;
        }
        return count;
      }, 0)
    : 0;

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

              {isQuizOver && (
                <p
                  className="correct-answers-banner"
                  style={{
                    backgroundColor:
                      correctCount / quiz.questions.length > 0.75
                        ? "#4caf50" // green
                        : correctCount / quiz.questions.length >= 0.25
                        ? "#ffc107" // yellow
                        : "#f44336", // red
                  }}
                >
                  <strong>Correct Answers:</strong> {correctCount} /{" "}
                  {quiz.questions.length}
                </p>
              )}
            </div>

            <a
              className="attempt-quiz-btn"
              onClick={() => {
                if (isQuizOver) {
                  window.location.reload();
                } else {
                  startQuiz();
                }
              }}
            >
              {isQuizOver
                ? "Reattempt Quiz"
                : isQuizStarted
                ? "Finish Quiz"
                : "Start Quiz"}
            </a>
          </div>
        )}
      </div>

      {isQuizStarted && (
        <>
          <div className="timer-container">
            <div className="timer-text" style={{ color: getTimerTextColor() }}>
              ⏱ Time Left: {formatTime(timeLeft)}
            </div>
            <div
              className="timer-progress-bar"
              style={getProgressBarStyle()}
            ></div>
          </div>

          <div className="quiz-container-wrap">
            {quiz?.questions.map((question: Question, index: number) => (
              <QuizQuestion
                key={index}
                question={question}
                isQuizOver={isQuizOver}
                selectedAnswerIndex={selectedAnswers[index]}
                onAnswerSelected={(answerIndex) =>
                  handleAnswerSelected(index, answerIndex)
                }
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
        </>
      )}
    </>
  );
}

export default QuizPage;
