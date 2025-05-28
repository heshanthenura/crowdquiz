import type { Quiz } from "../types/Quiz";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export function addQuiz(quiz: Quiz) {
  console.log("submit");
  console.log(quiz);
  quiz.userId = auth.currentUser?.uid;
  quiz.userName = auth.currentUser?.displayName ?? null;
  quiz.userEmail = auth.currentUser?.email ?? null;
  const quizRef = collection(db, "quizzes");
  addDoc(quizRef, quiz);
}
