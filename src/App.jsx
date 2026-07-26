import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import PrototypeDashboard from "./pages/PrototypeDashboard";
import SplashScreen from "./components/SplashScreen";

function App() {
  const getCurrentRoute = () => {
    return window.location.hash.replace("#", "") || "home";
  };

  const [currentRoute, setCurrentRoute] = useState(getCurrentRoute);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(getCurrentRoute());
    };

    window.addEventListener("hashchange", handleRouteChange);

    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (currentRoute !== "dashboard") {
      requestAnimationFrame(() => {
        const section = document.getElementById(currentRoute);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    }
  }, [currentRoute]);

  return (
    <>
      {currentRoute === "dashboard" ? (
        <PrototypeDashboard />
      ) : (
        <LandingPage />
      )}

      {loading && <SplashScreen />}
    </>
  );
}

export default App;