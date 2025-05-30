import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase/config";

export const getQuizCount = async () => {
  const quizzesRef = collection(db, "quizzes");
  const snapshot = await getCountFromServer(quizzesRef);
  return snapshot.data().count;
};
