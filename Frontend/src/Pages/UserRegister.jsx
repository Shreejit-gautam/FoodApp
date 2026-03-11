import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserRegister() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = {
      username: formData.get("fullname"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register", // adjust to your backend route
        result,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Success:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert("Registration failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <nav className="auth-toggle">
          <Link className="toggle-btn active" to="/user/register">User</Link>
          <Link className="toggle-btn" to="/foodpartner/register">Food Partner</Link>
        </nav>
        <header className="auth-header">
          <div className="auth-badge">User</div>
          <h1>Create your account</h1>
          <p>Save delivery addresses, track orders, and earn rewards.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Full name</span>
            <input type="text" name="fullname" placeholder="Alex Johnson" />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" placeholder="you@example.com" />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" name="password" placeholder="Create a password" />
          </label>
          <button type="submit" className="primary-btn">Create account</button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link className="link-btn" to="/user/login">Sign in</Link>
        </div>
      </section>
    </main>
  );
}