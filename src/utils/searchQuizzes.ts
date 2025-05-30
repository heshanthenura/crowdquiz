import {
  collection,
  getDocs,
  query,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "../firebase/config";
import type { Quiz } from "../types/Quiz";

export async function searchQuizzes(searchTerm: string): Promise<Quiz[]> {
  const quizRef = collection(db, "quizzes");

  const q = query(
    quizRef,
    orderBy("title"),
    startAt(searchTerm),
    endAt(searchTerm + "\uf8ff")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    quizId: doc.id,
    ...(doc.data() as Omit<Quiz, "quizId">),
  }));
}
