import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../firebase/config";

import NavBar from "../../components/navbar/NavBar";

import "./ProfilePage.css";
import AuthenticationError from "../../components/autherror/AuthenticationError";

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is logged in:", currentUser);
        setUser(currentUser);
      } else {
        console.log("No user is logged in");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="profile-page">
      {user ? (
        <div>
          <NavBar />
          <div className="profile-details-wrap">
            <img
              className="profile-picture"
              src={user.photoURL ?? "/default-profile.png"}
              alt="Profile"
            />
            <h2 className="profile-name">{user.displayName ?? "No Name"}</h2>
            <p className="profile-email">{user.email ?? "No Email"}</p>
          </div>
        </div>
      ) : (
        <AuthenticationError />
      )}
    </div>
  );
}

export default ProfilePage;
