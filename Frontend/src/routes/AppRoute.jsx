import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "../Pages/UserLogin";
import UserRegister from "../Pages/UserRegister";
import FoodPartnerLogin from "../Pages/FoodPartnerLogin";
import FoodPartnerRegister from "../Pages/FoodPartnerRegister";
import "../Pages/auth.css";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
      </Routes>
    </Router>
  );
}
