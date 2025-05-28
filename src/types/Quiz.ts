import { type Question } from "./ValidationResult";

export interface Quiz {
  dateCreated: string;
  timeCreated: number;
  userId: string | undefined;
  userName: string | null;
  userEmail: string | null;
  title: string;
  description: string;
  quizType: string[];
  time: number;
  numberOfQuestions: number;
  questions: Question[];
}
