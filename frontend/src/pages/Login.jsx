import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bg from "../assets/bg.png";
import logo from "../assets/logo.png";

import { loginUser } from "../api/auth"; 

export default function Login() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    setMousePosition({
      x: (clientX - centerX) / 80,
      y: (clientY - centerY) / 80,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const data = await loginUser(formData); // ✅ API CALL FROM auth.js

      toast.success("Login successful!");
      localStorage.setItem("access_token", data.access_token);

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.detail || err.response.data.error);
      } else {
        toast.error("Server not reachable");
      }
    }
  };

  return (
    <div className="auth-page login" onMouseMove={handleMouseMove}>
      <motion.div
        className="bg-image"
        style={{
          backgroundImage: `url(${bg})`,
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <div className="glass-card right">
        <div className="logo-row">
          <img src={logo} className="logo" alt="logo" />
          <span className="brand-name">Darukaa.Earth</span>
        </div>

        <h2>Welcome Back</h2>
        <p>Login to continue</p>

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

        <button onClick={handleSubmit}>Login</button>

        <span>
          Don’t have an account? <Link to="/register">Register</Link>
        </span>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Footer wave SVG (same as yours) */}
      <svg
        className="footer-wave"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,160 C160,140 320,120 480,130 C640,140 800,180 960,185 C1120,190 1280,175 1440,180 L1440,260 L0,260 Z"
          fill="#f5efe6"
        />

        <g fill="#6b5f4d" fontSize="16" fontFamily="Inter, sans-serif">
          <g transform="translate(200 160)">
            <path
              d="M8 0C3.6 0 0 3.4 0 7.7c0 5.8 8 14.3 8 14.3s8-8.5 8-14.3C16 3.4 12.4 0 8 0zm0 10.5a2.8 2.8 0 110-5.6 2.8 2.8 0 010 5.6z"
              fill="#6b5f4d"
            />
            <text x="26" y="14">Manage Environmental Sites</text>
          </g>

          <g transform="translate(200 190)">
            <path
              d="M0 18h4V8H0v10zm6 0h4V0H6v18zm6 0h4V12h-4v6z"
              fill="#6b5f4d"
            />
            <text x="26" y="14">Track Carbon & Biodiversity Data</text>
          </g>

          <g transform="translate(200 220)">
            <path
              d="M8 0l8 4v6c0 5-3.4 9.6-8 11-4.6-1.4-8-6-8-11V4l8-4z"
              fill="#6b5f4d"
            />
            <text x="26" y="15">Secure Access & Insights</text>
          </g>
        </g>

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
    </div>
  );
}
