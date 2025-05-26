import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import QuizzesPage from "./pages/quizzes/QuizzesPage";
import AboutPage from "./pages/about/AboutPage";
import AddQuizPage from "./pages/add-quiz/AddQuizPage";
import ProfilePage from "./pages/profile/ProfilePage";
import QuizPpage from "./pages/quizppage/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/add-quiz" element={<AddQuizPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/quiz/:quizId" element={<QuizPpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
