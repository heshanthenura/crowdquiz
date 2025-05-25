import NavBar from "../../components/navbar/NavBar";
import "./AddQuizPage.css";

function AddQuizPage() {
  return (
    <div className="add-quiz-page">
      <NavBar />
      <div className="add-quiz-content">
        <div className="add-quiz-header">
          <h1>Create New Quiz</h1>
          <p className="add-quiz-subtitle">
            Share your knowledge with the community
          </p>
        </div>

        <div className="quiz-form"></div>
      </div>
    </div>
  );
}

export default AddQuizPage;
