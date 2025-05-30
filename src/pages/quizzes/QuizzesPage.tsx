import { useEffect, useState, useRef } from "react";
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
  const [quizzesCache, setQuizzesCache] = useState<{ [page: number]: Quiz[] }>(
    {}
  );
  const lastVisibleDocsRef = useRef<QueryDocumentSnapshot[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await getQuizCount();
      setQuizCount(count);
    };
    fetchCount();
  }, []);

  const fetchPage = async (page: number) => {
    setLoading(true);
    let cursor: QueryDocumentSnapshot | null = null;
    if (page > 1) {
      cursor = lastVisibleDocsRef.current[page - 2] || null;
    }

    console.log(`Fetching page ${page} with cursor:`, cursor);

    const { quizzes, lastVisible } = await fetchQuizzesPage(PAGE_SIZE, cursor);

    setQuizzesCache((prev) => ({ ...prev, [page]: quizzes }));

    if (lastVisible) {
      // Update ref synchronously
      lastVisibleDocsRef.current[page - 1] = lastVisible;
    }

    setLoading(false);
  };

  useEffect(() => {
    const loadInitialPages = async () => {
      await fetchPage(1);
      await fetchPage(2);
    };
    loadInitialPages();
  }, []);

  const handleNext = async () => {
    if (loading) return;
    const nextPage = currentPage + 1;
    if (nextPage > Math.ceil(quizCount / PAGE_SIZE)) return;

    if (quizzesCache[nextPage]) {
      setCurrentPage(nextPage);
      fetchPage(nextPage + 1);
    } else {
      await fetchPage(nextPage);
      setCurrentPage(nextPage);
      fetchPage(nextPage + 1);
    }
  };

  const handlePrevious = async () => {
    if (loading) return;
    if (currentPage === 1) return;
    const prevPage = currentPage - 1;

    if (quizzesCache[prevPage]) {
      setCurrentPage(prevPage);
    } else {
      await fetchPage(prevPage);
      setCurrentPage(prevPage);
    }
  };

  const quizzes = quizzesCache[currentPage] || [];

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

        <div className="quizzes-grid">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => <QuizCard key={quiz.quizId} quiz={quiz} />)
          ) : (
            <p className="quizzes-grid-p">No quizzes found.</p>
          )}
        </div>

        <div className="pagination-buttons" style={{ marginTop: "20px" }}>
          <button
            disabled={currentPage === 1 || loading}
            onClick={handlePrevious}
            style={{ marginRight: "10px" }}
          >
            Previous
          </button>
          <button
            disabled={
              currentPage === Math.ceil(quizCount / PAGE_SIZE) || loading
            }
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
