import { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import QuizCard from "../../components/quizcard/QuizCard";
import { getQuizCount } from "../../utils/getQuizCount";
import { fetchQuizzesPage } from "../../utils/fetchQuizzesPage";
import "./QuizzesPage.css";
import type { Quiz } from "../../types/Quiz";
import type { QueryDocumentSnapshot } from "firebase/firestore";

const PAGE_SIZE = 10;

function QuizzesPage() {
  const [quizCount, setQuizCount] = useState(0);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [lastVisibleDocs, setLastVisibleDocs] = useState<
    QueryDocumentSnapshot[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await getQuizCount();
      setQuizCount(count);
    };
    fetchCount();
  }, []);

  const fetchAndSetQuizzes = async (page: number) => {
    let cursor = null;
    if (page > 1) {
      cursor = lastVisibleDocs[page - 2] || null;
    }

    const { quizzes: fetchedQuizzes, lastVisible } = await fetchQuizzesPage(
      PAGE_SIZE,
      cursor
    );

    if (lastVisible) {
      setLastVisibleDocs((prev) => {
        const newCursors = [...prev];
        newCursors[page - 1] = lastVisible;
        return newCursors;
      });
    }

    setQuizzes(fetchedQuizzes);
  };

  useEffect(() => {
    fetchAndSetQuizzes(1);
  }, []);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage > Math.ceil(quizCount / PAGE_SIZE)) return;
    setCurrentPage(nextPage);
    fetchAndSetQuizzes(nextPage);
  };

  const handlePrevious = () => {
    if (currentPage === 1) return;
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    fetchAndSetQuizzes(prevPage);
  };

  return (
    <div className="quizzes-page">
      <NavBar />
      <div className="quizzes-content">
        <div className="quizzes-header">
          <h1>Explore Quizzes</h1>
          <p className="quizzes-subtitle">
            Browse through all available quizzes
          </p>
        </div>
        {/* <div className="search-bar">
          <input type="text" placeholder="Search quizzes..." />
        </div> */}
        <div className="quizzes-grid">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => <QuizCard key={quiz.quizId} quiz={quiz} />)
          ) : (
            <p>No quizzes found.</p>
          )}
        </div>

        <div className="pagination-buttons" style={{ marginTop: "20px" }}>
          <button
            disabled={currentPage === 1}
            onClick={handlePrevious}
            style={{ marginRight: "10px" }}
          >
            Previous
          </button>
          <button
            disabled={currentPage === Math.ceil(quizCount / PAGE_SIZE)}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizzesPage;
