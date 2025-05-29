import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import QuizzesPage from "./pages/quizzes/QuizzesPage";
import AboutPage from "./pages/about/AboutPage";
import AddQuizPage from "./pages/add-quiz/AddQuizPage";
import ProfilePage from "./pages/profile/ProfilePage";
import QuizPage from "./pages/quiz/QuizPage";
import { AuthProvider } from "./context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <AuthProvider>
      <SpeedInsights />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/add-quiz" element={<AddQuizPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
