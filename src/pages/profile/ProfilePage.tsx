import NavBar from "../../components/navbar/NavBar";

import "./ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profile-page">
      <NavBar />
      <div className="profile-content">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>

        <div className="profile-card">
          <div className="profile-image-container">
            <img
              src="{user.photoURL}"
              alt={"Profile"}
              className="profile-image"
            />

            <div className="profile-image-placeholder"></div>
          </div>
          <div className="profile-info"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
