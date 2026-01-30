import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import bg from "../assets/register-bg.png";
import logo from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Simple frontend validation
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register",
        formData
      );
      toast.success(response.data.message);
      setTimeout(() => navigate("/"), 1500); // redirect to login
    } catch (err) {
      if (err.response) {
        // backend returned an error
        toast.error(err.response.data.detail || err.response.data.error);
      } else {
        toast.error("Server not reachable");
      }
    }
  };

  return (
    <motion.div
      className="auth-page register"
      initial={{ opacity: 0, x: -80, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 1.02 }}
      transition={{ duration: 0.65, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <motion.div
        className="bg-image"
        style={{ backgroundImage: `url(${bg})` }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <div className="glass-card right">
        <div className="logo-row">
          <img src={logo} className="logo" />
          <span className="brand-name">Darukaa.Earth</span>
        </div>

        <h2>Create Account</h2>
        <p>Start your journey</p>

        <input
          type="text"
          placeholder="Full Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Register</button>

        <span>
          Already have an account? <Link to="/">Login</Link>
        </span>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    

      
       <svg
  className="footer-wave"
  viewBox="0 0 1440 260"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Background wave */}
  <path
    d="M0,160 
       C160,140 320,120 480,130 
       C640,140 800,180 960,185 
       C1120,190 1280,175 1440,180 
       L1440,260 L0,260 Z"
    fill="#f5efe6"
  />

  {/* Left text group */}
 <g
  fill="#6b5f4d"
  fontSize="16"
  fontFamily="Inter, sans-serif"
>

  {/* Item 1 */}
  <g transform="translate(200 160)">
    <path
      d="M8 0C3.6 0 0 3.4 0 7.7c0 5.8 8 14.3 8 14.3s8-8.5 8-14.3C16 3.4 12.4 0 8 0zm0 10.5a2.8 2.8 0 110-5.6 2.8 2.8 0 010 5.6z"
      fill="#6b5f4d"
    />
    <text x="26" y="14">Manage Environmental Sites</text>
  </g>

  {/* Item 2 */}
  <g transform="translate(200 190)">
    <path
      d="M0 18h4V8H0v10zm6 0h4V0H6v18zm6 0h4V12h-4v6z"
      fill="#6b5f4d"
    />
    <text x="26" y="14">Track Carbon & Biodiversity Data</text>
  </g>

  {/* Item 3 */}
  <g transform="translate(200 220)">
    <path
      d="M8 0l8 4v6c0 5-3.4 9.6-8 11-4.6-1.4-8-6-8-11V4l8-4z"
      fill="#6b5f4d"
    />
    <text x="26" y="15">Secure Access & Insights</text>
  </g>

</g>


  {/* Right copyright */}
  <text
    x="1250"
    y="235"
    textAnchor="end"
    fill="#8a7f6d"
    fontSize="14"
    fontFamily="Inter, sans-serif"
  >
    © 2026 Darukaa.Earth. All rights reserved.
  </text>
</svg>
    </motion.div>
  );
}


      

 