import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./RecentSection.css";
import QuizCard from "../quizecard/QuizCard";

export interface QuizData {
  id: string;
  title: string;
  description: string;
  author: { name: string };
  questionCount: number;
  // Add other fields you might need, like quizType
}

function RecentSection() {
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentQuizzes = async () => {
      try {
        const q = query(
          collection(db, "quizzes"),
          orderBy("createdAt", "desc"), // Order by creation date descending
          limit(10) // Limit to the latest 10
        );
        const querySnapshot = await getDocs(q);
        const quizzesList = querySnapshot.docs.map((doc) => {
          const data = doc.data() as QuizData;
          return {
            ...data,
            id: doc.id, // Ensure doc.id is used as the primary ID
          };
        });
        setQuizzes(quizzesList);
      } catch (err: unknown) {
        console.error("Error fetching recent quizzes:", err);
        setError("Failed to load recent quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentQuizzes();
  }, []);

  return (
    <div className="recent-section-wrap">
      <div className="recent-heading">Recent Quizzes</div>
      <div className="recent-quizzes-wrap">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading recent quizzes...</p>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : quizzes.length > 0 ? (
          quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
        ) : (
          <p>No recent quizzes found.</p>
        )}
      </div>
    </div>
  );
}

export default RecentSection;
