import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./style.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } 
      else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) return null;

  return (
    <main className="profile-page">
      <div className="profile-container">
        <aside className="profile-sidebar">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.displayName || user.email
            )}&background=ffc300&color=000`}
            alt="avatar"
            className="profile-avatar"
          />
          <h3>{user.displayName || user.email.split("@")[0]}</h3>
          <p>{user.email}</p>

          <nav className="profile-menu">
            <button
              className={activeTab === "account" ? "active" : ""}
              onClick={() => setActiveTab("account")}
            >
              👤 My Account
            </button>
            <button
              className={activeTab === "favorites" ? "active" : ""}
              onClick={() => navigate("/favorites")}
            >
              ❤️ Favorites
            </button>
            <button
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => navigate("/cart")}
            >
              🛒 Cart
            </button>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </aside>

        <section className="profile-content">
          {activeTab === "account" && (
            <div className="tab-content">
              <h2>Account Details</h2>
              <div className="profile-info">
                <label>Username</label>
                  <div className="info-row">
                    <span>{user.displayName || "Not set"}</span>
                  </div>

                <label>Email</label>
                <p>{user.email}</p>

                <label>Joined</label>
                <p>{user.metadata.creationTime}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;