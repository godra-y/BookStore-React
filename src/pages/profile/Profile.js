import React, { useEffect, useState } from "react";
import "./style.css";

import {
  subscribeToUser,
  getUserDoc,
  uploadProfilePhoto,
  logout,
} from "../../services/profileService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToUser(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userData = await getUserDoc(currentUser.uid);

        if (userData?.photoBase64) {
          setPhotoURL(userData.photoBase64);
        } else {
          setPhotoURL(currentUser.photoURL);
        }
      } else {
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const base64 = await uploadProfilePhoto(file, user);
      setPhotoURL(base64);
      alert("Profile picture updated!");
    } catch (err) {
      alert(err.message);
    }

    setUploading(false);
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  if (!user) return null;

  return (
    <main className="profile-page">
      <div className="profile-container">
        <aside className="profile-sidebar">
          <img
            src={
              photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.displayName || user.email
              )}&background=ffc300&color=000`
            }
            alt="avatar"
            className="profile-avatar"
          />

          <h3>{user.displayName || user.email.split("@")[0]}</h3>
          <p>{user.email}</p>

          {/* <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            disabled={uploading}
          /> */}

          <nav className="profile-menu">
            <button
              className={activeTab === "account" ? "active" : ""}
              onClick={() => setActiveTab("account")}
            >
              👤 My Account
            </button>

            <button
              onClick={() => (window.location.href = "/favorites")}
            >
              ❤️ Favorites
            </button>

            <button
              onClick={() => (window.location.href = "/cart")}
            >
              🛒 Cart
            </button>
          </nav>

          <label htmlFor="file-upload" className={`custom-file-upload ${uploading ? 'disabled' : ''}`}>
            {uploading ? "Uploading..." : "Upload Photo"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: "none" }}
          />

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