import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

import LandingPage from "./pages/LandingPage";
import Leaderboard from "./pages/Leaderboard";
import Tasks from "./pages/Tasks";
import Contact from "./pages/Contact";

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Clear session storage on page reload and show loading screen
    const isPageReload =
      performance.navigation?.type === 1 ||
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isPageReload) {
      sessionStorage.removeItem("appLoaded");
      return true;
    }

    // Check if the app has already loaded in this session
    return !sessionStorage.getItem("appLoaded");
  });

  useEffect(() => {
    if (isLoading) return; // Don't run logic if loading

    // Mark app as loaded in session storage
    sessionStorage.setItem("appLoaded", "true");

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Get scroll value
    lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
      console.log({ scroll, limit, velocity, direction, progress });
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Use Lenis scrolling for ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, [isLoading]); // Rerun when isLoading changes

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router basename="/mvp_6">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
