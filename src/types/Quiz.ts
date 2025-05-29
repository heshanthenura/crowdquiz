import { type Question } from "./ValidationResult";

export interface Quiz {
  quizId: string;
  userId: string | undefined;
  dateCreated: string;
  timeCreated: number;
  userName: string | null;
  userEmail: string | null;
  title: string;
  description: string;
  quizType: string[];
  time: number;
  numberOfQuestions: number;
  questions: Question[];
}
