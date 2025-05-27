import { Link } from "react-router-dom";
import "./AuthenticationError.css";

function AuthenticationError() {
  return (
    <div className="authentication-error">
      <div className="error-box">
        <h1>Oops! 🔒</h1>
        <p>It seems you're not authenticated to view this page.</p>
        <Link to="/" className="home-button">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default AuthenticationError;
