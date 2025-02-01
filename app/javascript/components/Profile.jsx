import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({ email: "", name: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch current user profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user); // Set user data if successful
        } else {
          throw new Error(data.errors || "Failed to load profile");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(false); // Reset success state

    try {
      const response = await fetch("http://localhost:3000/api/auth/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({
          user: {
            email: user.email,
            name: user.name,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors || "Profile update failed");
      }

      setSuccess(true); // Profile updated successfully
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Profile updated successfully!</p>}

      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
