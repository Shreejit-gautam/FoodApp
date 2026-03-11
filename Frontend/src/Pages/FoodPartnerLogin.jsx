import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function FoodPartnerLogin() {
  const handleSubmit = async (e) => {
    console.log("helllo")
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = {
      email: formData.get("email"),
      password: formData.get("password"),
      
    };
    console.log(result)
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login", // adjust to your backend route
        result,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Success:", response.data);
      alert("Food Partner login successful!");
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <nav className="auth-toggle">
          <Link className="toggle-btn" to="/user/login">User</Link>
          <Link className="toggle-btn active" to="/foodpartner/login">Food Partner</Link>
        </nav>
        <header className="auth-header">
          <div className="auth-badge">Food Partner</div>
          <h1>Partner sign in</h1>
          <p>Manage menus, track orders, and grow your delivery business.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Business email</span>
            <input type="email" name="email" placeholder="partner@restaurant.com" />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" name="password" placeholder="????????" />
          </label>
          <div className="field-row">
            <label className="check">
              <input type="checkbox" />
              <span>Remember this device</span>
            </label>
            <button type="button" className="link-btn">Need help?</button>
          </div>
          <button type="submit" className="primary-btn">Sign in</button>
        </form>

        <div className="auth-footer">
          <span>New partner?</span>
          <Link className="link-btn" to="/foodpartner/register">Apply to join</Link>
        </div>
      </section>
    </main>
  );
}
