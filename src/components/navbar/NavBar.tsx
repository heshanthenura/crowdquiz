import MenuBtn from "../menubtn/MenuBtn";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";
import GoogleLogo from "../../assets/google-logo.svg";
import { useAuth } from "../../contexts/AuthContext";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthClick = async () => {
    if (user) {
      await logout();
    } else {
      await signInWithGoogle();
    }
  };

  const handleAddQuiz = () => {
    navigate("/add-quiz");
  };

  return (
    <div className="navbar-wrap">
      <div className="nav-heading">CrowdQuiz</div>
      <MenuBtn onClick={toggleMenu} isOpen={isMenuOpen} />
      <div className={`navbar-links ${isMenuOpen ? "show" : ""}`}>
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/quizzes">
          Quizzes
        </Link>
        <Link className="navbar-link" to="/about">
          About
        </Link>

        {user && (
          <Link className="navbar-link" to="/profile">
            Profile
          </Link>
        )}

        <div className="login-btn-wrap">
          {user && (
            <button className="add-quiz-btn" onClick={handleAddQuiz}>
              Add Quiz
            </button>
          )}
          <button className="login-btn" onClick={handleAuthClick}>
            {user ? (
              "Logout"
            ) : (
              <>
                Login with{" "}
                <img src={GoogleLogo} alt="Google" className="google-logo" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
