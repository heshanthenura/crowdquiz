import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/config";
import type { Quiz } from "../types/Quiz";

export async function fetchQuizzesPage(
  pageSize: number,
  cursor?: QueryDocumentSnapshot<DocumentData> | null
): Promise<{
  quizzes: Quiz[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> {
  const quizRef = collection(db, "quizzes");

  let q;

  if (cursor) {
    q = query(
      quizRef,
      orderBy("dateCreated", "desc"),
      startAfter(cursor),
      limit(pageSize)
    );
  } else {
    q = query(quizRef, orderBy("dateCreated", "desc"), limit(pageSize));
  }

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return { quizzes: [], lastVisible: null };
  }

  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  const quizzes = snapshot.docs.map((doc) => ({
    quizId: doc.id,
    ...(doc.data() as Omit<Quiz, "quizId">),
  }));

  return { quizzes, lastVisible };
}
