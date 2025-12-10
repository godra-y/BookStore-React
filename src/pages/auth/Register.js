import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

  const validate = () => {
    const newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters, include one number and one special character.";
    }

    if (repeatPassword !== password) {
      newErrors.repeatPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      setLoading(true);
      await register(email, password);
      navigate("/login");
    } 
    catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already registered." });
      } 
      else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label>Repeat Password</label>
          <input
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
          {errors.repeatPassword && (
            <p className="error">{errors.repeatPassword}</p>
          )}

          {errors.general && <p className="error">{errors.general}</p>}

          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Loading" : "Register"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </main>
  );
};

export default Register;