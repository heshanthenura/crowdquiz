import NavBar from "../../components/navbar/NavBar";
import { useAuth } from "../../contexts/AuthContext";
import "./ProfilePage.css";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <NavBar />
      <div className="profile-content">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>

        <div className="profile-card">
          <div className="profile-image-container">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "Profile"}
                className="profile-image"
              />
            ) : (
              <div className="profile-image-placeholder">
                {user?.displayName?.[0]?.toUpperCase() ||
                  user?.email?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h2>{user?.displayName || "User"}</h2>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
