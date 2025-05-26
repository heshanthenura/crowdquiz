import MenuBtn from "../menubtn/MenuBtn";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";
import GoogleLogo from "../../assets/google-logo.svg";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        <div className="login-btn-wrap">
          <button className="login-btn">
            Login with{" "}
            <img src={GoogleLogo} alt="Google" className="google-logo" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
