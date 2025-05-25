import "./Welcome.css";
import welcomeImage from "../../assets/welcome-img.png";
import welcomeText from "../../assets/welcome-text.png";
function Welcome() {
  return (
    <div className="welcome-container">
      <img className="welcome-text" src={welcomeText} alt="welcome text" />
      <img
        className="welcome-image"
        src={welcomeImage}
        alt="college students"
      />
    </div>
  );
}

export default Welcome;
