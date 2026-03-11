import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FoodPartnerRegister() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = {
      restaurantName: formData.get("restaurantName"),
      foodpartnername: formData.get("foodpartnername"),
      email: formData.get("email"),
      phoneno: formData.get("phoneno"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register", // adjust to your backend route
        result,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Success:", response.data);
      alert("Food partner registered successfully!");
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert("Registration failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <nav className="auth-toggle">
          <Link className="toggle-btn" to="/user/register">User</Link>
          <Link className="toggle-btn active" to="/foodpartner/register">Food Partner</Link>
        </nav>
        <header className="auth-header">
          <div className="auth-badge">Food Partner</div>
          <h1>Join as a partner</h1>
          <p>Set up your storefront and start receiving delivery orders.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Restaurant name</span>
            <input type="text" name="restaurantName" placeholder="Taste Street Kitchen" />
          </label>
          <label className="field">
            <span>Owner name</span>
            <input type="text" name="foodpartnername" placeholder="Owner or manager" />
          </label>
          <label className="field">
            <span>Business email</span>
            <input type="email" name="email" placeholder="partner@restaurant.com" />
          </label>
          <label className="field">
            <span>Phone</span>
            <input type="tel" name="phoneno" placeholder="+977 98xxxxxxxx" />
          </label>
          <label className="field">
            <span>Create password</span>
            <input type="password" name="password" placeholder="Create a password" />
          </label>
          <button type="submit" className="primary-btn">Create partner account</button>
        </form>

        <div className="auth-footer">
          <span>Already onboard?</span>
          <Link className="link-btn" to="/foodpartner/login">Sign in</Link>
        </div>
      </section>
    </main>
  );
}