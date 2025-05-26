import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { QuizData } from '../components/recentsection/RecentSection';  // Type-only import

export function useRecentQuizzes() {
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentQuizzes = async () => {
      try {
        const q = query(
          collection(db, "quizzes"),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const quizzesList = querySnapshot.docs.map((doc) => {
          const data = doc.data() as QuizData;
          return { ...data, id: doc.id };
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

  return { quizzes, loading, error };
} 