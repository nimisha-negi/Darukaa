import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.webp";


export default function Navbar() {
  const navigate = useNavigate();
  const [username] = useState(() => localStorage.getItem("username") || "User");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    navigate("/", { replace: true });
  };

  return (
    <header className="dash-navbar">
      <h3>Welcome back, {username}</h3>

      <div className="nav-right">
        <span className="icon">🔔</span>


        <img src={avatar} alt="user" className="nav-avatar" />


        <span className="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout ▾
        </span>
      </div>
    </header>
  );
}
