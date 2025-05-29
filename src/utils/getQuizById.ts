import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import type { Quiz } from "../types/Quiz";

export async function getQuizById(
  quizId: string | undefined
): Promise<Quiz | null> {
  if (!quizId) {
    return null;
  }

  const docRef = doc(db, "quizzes", quizId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Quiz;
  } else {
    console.log("No such document!");
    return null;
  }
}
