import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "../Pages/UserLogin";
import UserRegister from "../Pages/UserRegister";
import FoodPartnerLogin from "../Pages/FoodPartnerLogin";
import FoodPartnerRegister from "../Pages/FoodPartnerRegister";
import Home from "../general/Home";
import VideoUpload from "../general/video_upload";
import "../Pages/auth.css";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/foodpartner/VideoUpload" element={<VideoUpload />} />
      </Routes>
    </Router>
  );
}
