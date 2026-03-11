import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserLogin() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = {
      email: formData.get("email"),
      password: formData.get("password"),
      
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login", // adjust to your backend route
        result,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Success:", response.data);
      alert("User login successful!");
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <nav className="auth-toggle">
          <Link className="toggle-btn active" to="/user/login">User</Link>
          <Link className="toggle-btn" to="/foodpartner/login">Food Partner</Link>
        </nav>
        <header className="auth-header">
          <div className="auth-badge">User</div>
          <h1>Welcome back</h1>
          <p>Sign in to track orders, re-order favorites, and save time.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" placeholder="you@example.com" />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" name="password" placeholder="********" />
          </label>
          <div className="field-row">
            <label className="check">
              <input type="checkbox" name="keepSignedIn" />
              <span>Keep me signed in</span>
            </label>
            <button type="button" className="link-btn">Forgot password?</button>
          </div>
          <button type="submit" className="primary-btn">Sign in</button>
        </form>

        <div className="auth-footer">
          <span>New here?</span>
          <Link className="link-btn" to="/user/register">Create a user account</Link>
        </div>
      </section>
    </main>
  );
}