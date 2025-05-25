import React from "react";
import "./QuizType.css";

interface QuizTypeProps {
  text: string;
}

function QuizType({ text }: QuizTypeProps) {
  return <div className="quiz-type">{text}</div>;
}

export default QuizType;
