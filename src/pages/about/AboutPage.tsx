import NavBar from "../../components/navbar/NavBar";
import DeveloperImage from "../../assets/developer-img.jpeg";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <NavBar />
      <div className="about-content">
        <div className="about-header">
          <h1>About CrowdQuiz</h1>
          <p className="about-subtitle">
            Empowering Students Through Collaborative Learning
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At CrowdQuiz, we believe in the power of collaborative learning. Our
            platform enables students to create, share, and learn from each
            other through interactive quizzes. We're building a community where
            knowledge flows freely and learning becomes a shared experience.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Create Quizzes</h3>
              <p>
                Design your own quizzes with various question types and share
                them with your peers.
              </p>
            </div>
            <div className="feature-card">
              <h3>Learn Together</h3>
              <p>
                Access quizzes created by other students and enhance your
                learning experience.
              </p>
            </div>
            <div className="feature-card">
              <h3>Track Progress</h3>
              <p>
                Monitor your performance and identify areas for improvement.
              </p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Join Our Community</h2>
          <p>
            Whether you're a student looking to test your knowledge or someone
            who wants to share their expertise, CrowdQuiz is the perfect
            platform for you. Join us in creating a more interactive and
            engaging learning environment.
          </p>
        </div>

        <div className="about-section developer-section">
          <h2>Meet the Developer</h2>
          <div className="developer-info">
            <img
              src={DeveloperImage}
              alt="Heshan Thenura Kariyawasam"
              className="developer-image"
            />
            <h3>Heshan Thenura Kariyawasam</h3>
            <div className="social-links">
              <a
                href="https://github.com/heshanthenura"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/heshanthenura"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/heshan_thenura/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://youtube.com/@heshanthenura"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
              <a href="mailto:heshanthenura@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
