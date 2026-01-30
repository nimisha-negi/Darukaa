export default function Navbar() {
  return (
    <header className="dash-navbar">
      <h3>Welcome back, Jane Doe</h3>

      <div className="nav-right">
        <span className="icon">🔔</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="nav-avatar"
        />
        <span className="logout">Logout ▾</span>
      </div>
    </header>
  );
}
