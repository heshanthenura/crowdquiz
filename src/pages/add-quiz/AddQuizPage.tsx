import NavBar from "../../components/navbar/NavBar";
import "./AddQuizPage.css";

function AddQuizPage() {
  return (
    <div className="add-quiz-page">
      <NavBar />
      <div className="add-quiz-content">
        <div className="add-quiz-header">
          <h1>Create New Quiz</h1>
          <p>Share your knowledge with the community</p>
        </div>

        <form className="quiz-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="title">Quiz Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value="asdasd"
                placeholder="Enter quiz title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value="12313"
                placeholder="Enter quiz description"
                required
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
                  className={`checkbox-label active`}
                >
                  Essay
                </button>
                <button
                  type="button"
                  disabled
                  className={`checkbox-label active`}
                >
                  Structured Essay
                </button>
                <button
                  type="button"
                  disabled
                  className={`checkbox-label active`}
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
                  value="60"
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
                  value="20"
                  placeholder="20"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="json-header">
                <label>Questions (JSON Format)</label>
                <button type="button" className="validate-btn">
                  Validate JSON
                </button>
              </div>

              <textarea
                className="json-input"
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
