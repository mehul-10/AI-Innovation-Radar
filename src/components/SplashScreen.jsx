import "./SplashScreen.css";
import logo3 from "../assets/logo3.png";

export default function SplashScreen() {
  return (
    <div className="splash-screen">

      <div className="splash-blur" />

      <img
        src={logo3}
        className="splash-logo"
        alt=""
      />

    </div>
  );
}