import type {
  Answer,
  Question,
  ValidationResult,
} from "../types/ValidationResult";

export const validateJson = (json: string): ValidationResult => {
  try {
    const parsed = JSON.parse(json);

    if (!parsed || !Array.isArray(parsed.questions)) {
      return {
        valid: false,
        count: 0,
        questions: [],
        error: "Invalid JSON structure",
      };
    }

    const cleanedQuestions: Question[] = [];

    for (const [index, q] of parsed.questions.entries()) {
      if (!q.question || typeof q.question !== "string") {
        return {
          valid: false,
          count: 0,
          questions: [],
          error: `Question at index ${index} is missing or invalid.`,
        };
      }

      if (!Array.isArray(q.answers) || q.answers.length === 0) {
        return {
          valid: false,
          count: 0,
          questions: [],
          error: `Answers missing or invalid at question index ${index}`,
        };
      }

      const cleanedAnswers: Answer[] = [];

      for (const [aIndex, a] of q.answers.entries()) {
        if (typeof a.text !== "string" || typeof a.isCorrect !== "boolean") {
          return {
            valid: false,
            count: 0,
            questions: [],
            error: `Invalid answer format at question ${index}, answer ${aIndex}`,
          };
        }

        cleanedAnswers.push({
          text: a.text,
          isCorrect: a.isCorrect,
        });
      }

      cleanedQuestions.push({
        question: q.question,
        answers: cleanedAnswers,
      });
    }

    return {
      valid: true,
      count: cleanedQuestions.length,
      questions: cleanedQuestions,
      error: "",
    };
  } catch {
    return {
      valid: false,
      count: 0,
      questions: [],
      error: "Invalid JSON",
    };
  }
};
