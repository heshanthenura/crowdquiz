import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import "./AddQuizPage.css";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/config"; // Import auth

interface QuizData {
  title: string;
  description: string;
  quizTypes: {
    mcq: boolean;
    essay: boolean;
    structuredEssay: boolean;
    other: boolean;
  };
  time: string;
  numberOfQuestions: string;
}

interface QuestionData {
  question: string;
  answers: Array<{
    text: string;
    isCorrect?: boolean;
    correct?: boolean;
  }>;
}

function AddQuizPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<QuizData>({
    title: "",
    description: "",
    quizTypes: {
      mcq: true,
      essay: false,
      structuredEssay: false,
      other: false,
    },
    time: "60",
    numberOfQuestions: "20",
  });
  const [jsonInput, setJsonInput] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<
    "valid" | "invalid" | null
  >(null);
  const [questionCount, setQuestionCount] = useState<number>(0);

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuizTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      quizTypes: {
        ...prev.quizTypes,
        [type]: !prev.quizTypes[type as keyof typeof prev.quizTypes],
      },
    }));
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    setJsonError(null); // Clear error when input changes
    setValidationStatus(null); // Clear status when input changes
  };

  const validateJson = (): QuestionData[] | null => {
    try {
      const parsedData: { questions: QuestionData[] } = JSON.parse(jsonInput);
      if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
        setJsonError("JSON must contain a 'questions' array");
        setValidationStatus("invalid");
        setQuestionCount(0);
        return null;
      }

      // Normalize answers
      const validatedQuestions = parsedData.questions.map((question) => ({
        ...question,
        answers: question.answers.map((answer) => ({
          text: answer.text,
          isCorrect: answer.isCorrect ?? answer.correct ?? false,
        })),
      }));

      setJsonError(null);
      setValidationStatus("valid");
      setQuestionCount(validatedQuestions.length);
      return validatedQuestions;
    } catch {
      setJsonError("Invalid JSON format");
      setValidationStatus("invalid");
      setQuestionCount(0);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const questions = validateJson();

    if (questions) {
      try {
        const user = auth.currentUser; // Get current user

        if (!user) {
          alert("Please sign in to create a quiz");
          return;
        }

        // Add document to 'quizzes' collection
        const docRef = await addDoc(collection(db, "quizzes"), {
          title: formData.title,
          description: formData.description,
          questions: questions,
          createdAt: new Date(),
          timeLimit: parseInt(formData.time),
          questionCount: parseInt(formData.numberOfQuestions),
          quizType: "mcq", // Since we only have MCQ enabled
          author: {
            uid: user.uid,
            name: user.displayName || "Anonymous",
            email: user.email,
          },
        });

        console.log("Document written with ID: ", docRef.id);

        // Reset form after successful submission
        setFormData({
          title: "",
          description: "",
          quizTypes: {
            mcq: true,
            essay: false,
            structuredEssay: false,
            other: false,
          },
          time: "60",
          numberOfQuestions: "20",
        });
        setJsonInput("");
        setQuestionCount(0);

        // Show success message
        alert("Quiz created successfully!");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error creating quiz. Please try again.");
      }
    }
  };

  return (
    <div className="add-quiz-page">
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
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter quiz title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter quiz description"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label>Quiz Type</label>
              <div className="checkbox-group">
                <button
                  type="button"
                  className={`checkbox-label ${
                    formData.quizTypes.mcq ? "active" : ""
                  }`}
                  onClick={() => handleQuizTypeChange("mcq")}
                >
                  MCQ
                </button>
                <button
                  type="button"
                  disabled
                  className={`checkbox-label ${
                    formData.quizTypes.essay ? "active" : ""
                  }`}
                  onClick={() => handleQuizTypeChange("essay")}
                >
                  Essay
                </button>
                <button
                  type="button"
                  disabled
                  className={`checkbox-label ${
                    formData.quizTypes.structuredEssay ? "active" : ""
                  }`}
                  onClick={() => handleQuizTypeChange("structuredEssay")}
                >
                  Structured Essay
                </button>
                <button
                  type="button"
                  disabled
                  className={`checkbox-label ${
                    formData.quizTypes.other ? "active" : ""
                  }`}
                  onClick={() => handleQuizTypeChange("other")}
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
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="60"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="numberOfQuestions">Number of Questions</label>
                <input
                  type="number"
                  id="numberOfQuestions"
                  name="numberOfQuestions"
                  value={formData.numberOfQuestions}
                  onChange={handleInputChange}
                  placeholder="20"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="json-header">
                <label>Questions (JSON Format)</label>
                <button
                  type="button"
                  className="validate-btn"
                  onClick={() => validateJson()}
                >
                  Validate JSON
                </button>
                {questionCount > 0 && (
                  <span className="question-count">
                    {questionCount} question{questionCount !== 1 ? "s" : ""}{" "}
                    found
                  </span>
                )}
              </div>
              {validationStatus === "valid" && (
                <div className="json-valid">It's valid</div>
              )}
              {validationStatus === "invalid" && jsonError && (
                <div className="json-error">{jsonError}</div>
              )}
              <textarea
                className="json-input"
                value={jsonInput}
                onChange={handleJsonChange}
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

            <button type="submit" className="submit-btn">
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuizPage;
