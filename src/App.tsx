import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import QuizzesPage from "./pages/quizzes/QuizzesPage";
import AboutPage from "./pages/about/AboutPage";
import AddQuizPage from "./pages/add-quiz/AddQuizPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-quiz" element={<AddQuizPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
