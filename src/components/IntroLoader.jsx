import { useEffect, useState } from "react";
import logo3 from "../assets/logo3.png";
import "./IntroLoader.css";

function IntroLoader({ onFinish }) {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShrink(true);
    }, 500);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`intro-loader ${shrink ? "hide-bg" : ""}`}>
      <div className={`intro-logo ${shrink ? "shrink" : ""}`}>
        <img
          src={logo3}
          alt="AI Innovation Radar"
        />
      </div>
    </div>
  );
}

export default IntroLoader;