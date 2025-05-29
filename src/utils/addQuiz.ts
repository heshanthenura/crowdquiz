import type { Quiz } from "../types/Quiz";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export async function addQuiz(quiz: Quiz) {
  console.log("submit");

  const quizRef = doc(collection(db, "quizzes"));
  const quizId = quizRef.id;

  quiz.userId = auth.currentUser?.uid ?? "";
  quiz.userName = auth.currentUser?.displayName ?? null;
  quiz.userEmail = auth.currentUser?.email ?? null;
  quiz.dateCreated = new Date().toISOString();
  quiz.quizId = quizId;

  await setDoc(quizRef, quiz);

  console.log(`Quiz added with ID: ${quizId}`);
}
