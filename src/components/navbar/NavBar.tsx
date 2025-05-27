import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";

import "./NavBar.css";
import MenuBtn from "../menubtn/MenuBtn";
import GoogleLogo from "../../assets/google-logo.svg";
import { googleProvider, auth } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Signed in:", result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar-wrap">
      <div className="navbar-left">
        <div className="nav-heading">CrowdQuiz</div>
        <MenuBtn
          onClick={toggleMenu}
          isOpen={isMenuOpen}
          className="menu-btn"
        />
      </div>

      <div className={`navbar-center ${isMenuOpen ? "show" : ""}`}>
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
      </div>

      <div className={`navbar-right ${isMenuOpen ? "show" : ""}`}>
        {user && (
          <button className="add-quiz-btn" onClick={() => navigate("/create")}>
            Add Quiz
          </button>
        )}
        {user ? (
          <button
            className="login-btn"
            onClick={() => {
              signOut(auth);
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <button className="login-btn" onClick={signInWithGoogle}>
            Login with{" "}
            <img src={GoogleLogo} alt="Google" className="google-logo" />
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
