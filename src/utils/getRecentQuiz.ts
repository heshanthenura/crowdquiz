import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Quiz } from "../types/Quiz";

export async function getRecentQuizzes(): Promise<Quiz[]> {
  const quizRef = collection(db, "quizzes");

  const recentQuizzesQuery = query(
    quizRef,
    orderBy("dateCreated", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(recentQuizzesQuery);

  const quizzes: Quiz[] = snapshot.docs.map((doc) => ({
    ...(doc.data() as Quiz),
    quizId: doc.id,
  }));

  return quizzes;
}
