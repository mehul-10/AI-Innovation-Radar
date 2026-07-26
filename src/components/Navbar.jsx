import logo from "../assets/logo.png";

console.log(logo);
function Navbar() {
  return (
    <header className="navbar">
       <div className="brand">
  <img
    src={logo}
    alt="AI Innovation Radar"
    className="landing-logo"
  />
</div>

      <div className="navbar-actions">
        <button className="notification-button" type="button">
          <span className="notification-dot"></span>
          Notifications
        </button>

        <div className="user-profile">
          <div className="user-avatar">SK</div>

          <div className="user-information">
            <strong>Surbani Kaur</strong>
            <span>Innovation Analyst</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar