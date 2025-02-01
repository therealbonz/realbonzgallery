import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle Login or Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const endpoint = isLogin
      ? "http://localhost:3000/api/auth/sign_in"
      : "http://localhost:3000/auth";

    const body = isLogin
      ? { email, password }
      : { email, password, password_confirmation: passwordConfirmation };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? data.errors.join(", ") : "Authentication failed");
      }

      // Store authentication tokens
      localStorage.setItem("access-token", response.headers.get("access-token"));
      localStorage.setItem("client", response.headers.get("client"));
      localStorage.setItem("uid", response.headers.get("uid"));

      alert(isLogin ? "Login successful!" : "Signup successful!");
      navigate("/gallery"); // Redirect to Gallery.jsx after login/signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </p>
      {/* Link to Sign Up Page */}
      {!isLogin && (
        <p className="redirect-link">
          <button onClick={() => navigate("/signup")}>
            Go to Sign Up
          </button>
        </p>
      )}
    </div>
  );
};

export default Login;