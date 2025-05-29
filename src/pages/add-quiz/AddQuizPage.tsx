import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./AddQuizPage.css";

import NavBar from "../../components/navbar/NavBar";

import { type QuizForm } from "../../types/QuizForm";
import { type ValidationResult } from "../../types/ValidationResult";
import { type Quiz } from "../../types/Quiz";
import { addQuiz } from "../../utils/addQuiz";
import { validateJson } from "../../utils/jsonValidator";

function AddQuizPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [validation, setValidation] = useState<ValidationResult>({
    valid: false,
    count: 0,
    questions: [],
    error: "",
  });

  const [form, setForm] = useState<QuizForm>({
    title: "",
    description: "",
    time: 60,
    numberOfQuestions: 20,
    quizType: ["MCQ"],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "time" || name === "numberOfQuestions" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validation.valid) {
      alert("Please enter a valid JSON");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Adding quiz...", {
      position: "top-center",
    });

    const quiz: Quiz = {
      ...form,
      userId: undefined,
      userName: null,
      userEmail: null,
      dateCreated: new Date().toISOString(),
      timeCreated: new Date().getTime(),
      questions: validation.questions,
      quizId: "",
    };

    try {
      await addQuiz(quiz);
      toast.update(toastId, {
        render: "Quiz added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to add quiz.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const result = validateJson(jsonInput);
    setValidation(result);
    console.log(result.questions);
  }, [jsonInput]);

  return (
    <div className="add-quiz-page">
      {" "}
      <ToastContainer />
      <NavBar />
      <div className="add-quiz-content">
        <div className="add-quiz-header">
          <h1>Create New Quiz</h1>
          <p>Share your knowledge with the community</p>
        </div>

        <form className="quiz-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="title">Quiz Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter quiz title"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter quiz description"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label>Quiz Type</label>
              <div className="checkbox-group">
                <button type="button" className={`checkbox-label active`}>
                  MCQ
                </button>
                <button
                  type="button"
                  disabled
                  className={`checkbox-label inactive`}
                >
                  Essay
                </button>
                <button
                  type="button"
                  disabled
                  className={`checkbox-label inactive`}
                >
                  Structured Essay
                </button>
                <button
                  type="button"
                  disabled
                  className={`checkbox-label inactive`}
                >
                  Other
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="time">Time (minutes)</label>
                <input
                  type="number"
                  id="time"
                  name="time"
                  value={form.time}
                  placeholder="60"
                  min="1"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="numberOfQuestions">Number of Questions</label>
                <input
                  type="number"
                  id="numberOfQuestions"
                  name="numberOfQuestions"
                  value={form.numberOfQuestions}
                  placeholder="20"
                  min="1"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="json-header">
                <label>Questions (JSON Format)</label>
                <div
                  className={`json-validity-message ${
                    validation.valid ? "valid" : "invalid"
                  }`}
                >
                  {validation.valid
                    ? `Valid JSON - ${validation.count} Questions Found`
                    : validation.error}
                </div>
              </div>

              <textarea
                className="json-input"
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={`{
  "questions": [
    {
      "question": "Your question here",
      "answers": [
        { "text": "Answer 1", "correct": true },
        { "text": "Answer 2", "correct": false }
      ]
    }
  ]
}`}
                rows={10}
              />
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuizPage;
