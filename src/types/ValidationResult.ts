export interface ValidationResult {
  valid: boolean;
  count: number;
  questions: Question[];
  error: string;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}
