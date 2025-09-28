import React, { useEffect, useState, useRef } from "react";
import PixelBlast from "../components/PixelBlast.jsx"
import GridBackground from "../components/GridBackground.jsx"
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [smoothMousePosition, setSmoothMousePosition] = useState({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [pixelBlastLoaded, setPixelBlastLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const [viewport, setViewport] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 375,
    height: typeof window !== "undefined" ? window.innerHeight : 667,
  });

  // Detect if it's actually a mobile device regardless of viewport
  useEffect(() => {
    const checkMobileDevice = () => {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const hasTouch = typeof window !== 'undefined' && 'ontouchstart' in window;
      setIsMobileDevice(isMobile || hasTouch);
    };
    
    checkMobileDevice();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          mousePositionRef.current = {
            x: (e.clientX / viewport.width) * 2 - 1,
            y: -(e.clientY / viewport.height) * 2 + 1,
          };
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0 && !ticking) {
        window.requestAnimationFrame(() => {
          const touch = e.touches[0];
          mousePositionRef.current = {
            x: (touch.clientX / viewport.width) * 2 - 1,
            y: -(touch.clientY / viewport.height) * 2 + 1,
          };
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [viewport.width, viewport.height]);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setSmoothMousePosition((prev) => ({
        x: prev.x + (mousePositionRef.current.x - prev.x) * 0.1,
        y: prev.y + (mousePositionRef.current.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewTasksClick = () => {
    navigate('/tasks');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPixelBlastLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "#fff",
        position: "relative",
      }}
    >
      {/* Grid background using component */}
      <GridBackground opacity={0.5} zIndex={0} />

      {/* Fallback background gradient */}
      <div 
        className="absolute inset-0 z-5"
        style={{
          background: "linear-gradient(135deg, rgba(113, 82, 222, 0.05) 0%, rgba(75, 55, 145, 0.03) 100%)",
          pointerEvents: "none"
        }}
      />

      {/* PixelBlast Background - with better mobile handling */}
      {pixelBlastLoaded && (
        <div 
          className="absolute z-10"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'auto',
            top: (!isMobileDevice && viewport.width >= 1024) ? '3%' : '80px',
            left: (!isMobileDevice && viewport.width >= 1024) ? '-5%' : '0',
            right: (!isMobileDevice && viewport.width >= 1024) ? 'auto' : '0',
            bottom: (!isMobileDevice && viewport.width >= 1024) ? 'auto' : '0',
            transform: (!isMobileDevice && viewport.width >= 1024) ? 'scale(1.1)' : 'none',
            height: (!isMobileDevice && viewport.width >= 1024) ? '90%' : 'calc(100% - 80px)',
            background: 'transparent'
          }}
          onError={() => {
            console.warn('PixelBlast failed to render');
          }}
        >
          <PixelBlast
            variant="circle"
            pixelSize={isMobileDevice ? 2 : (viewport.width < 640 ? 3 : viewport.width < 1024 ? 4 : 6)}
            color="#7152DE"
            patternScale={isMobileDevice ? 1.5 : (viewport.width < 640 ? 2 : viewport.width < 1024 ? 2.5 : 3)}
            patternDensity={isMobileDevice ? 0.6 : (viewport.width < 640 ? 0.8 : viewport.width < 1024 ? 1.0 : 1.2)}
            pixelSizeJitter={isMobileDevice ? 0.2 : (viewport.width < 640 ? 0.3 : 0.5)}
            enableRipples={!isMobileDevice && viewport.width >= 640}
            rippleSpeed={0.3}
            rippleThickness={0.1}
            rippleIntensityScale={isMobileDevice ? 0.8 : (viewport.width < 640 ? 1.0 : 1.5)}
            liquid={!isMobileDevice && viewport.width >= 768}
            liquidStrength={isMobileDevice ? 0.05 : (viewport.width < 1024 ? 0.08 : 0.12)}
            liquidRadius={isMobileDevice ? 0.8 : (viewport.width < 1024 ? 1.0 : 1.2)}
            liquidWobbleSpeed={isMobileDevice ? 2 : (viewport.width < 640 ? 3 : 5)}
            speed={isMobileDevice ? 0.3 : (viewport.width < 640 ? 0.4 : 0.6)}
            edgeFade={isMobileDevice ? 0.5 : (viewport.width < 640 ? 0.4 : 0.25)}
            transparent
            mousePosition={smoothMousePosition}
            interactive={!isMobileDevice}
          />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 relative z-30">
        <div className="text-center relative">
          <img
            src="/logos/mvp_logo.webp"
            alt="MVP 6.0 Logo"
            className="mx-auto mb-8 animate-fade-in-up relative z-10"
            style={{
              width: "auto",
              height: "clamp(120px, 20vw, 300px)",
              maxWidth: "100%",
              animation: "fadeInUp 1.2s ease-out",
              filter: "drop-shadow(0 4px 20px rgba(113, 82, 222, 0.2))"
            }}
          />

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 relative z-10"
            style={{ animation: "fadeInUp 1.2s ease-out 0.6s both" }}
          >
            <button 
              onClick={handleViewTasksClick}
              className="group px-6 sm:px-8 py-3 font-semibold rounded-full border-2 border-[#7152DE] text-[#7152DE] bg-white shadow-md hover:bg-[#7152DE] hover:text-white transition-all duration-300 flex items-center gap-3 relative overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">View Tasks</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
            <button 
              onClick={scrollToAbout}
              className="group px-6 sm:px-8 py-3 font-semibold rounded-full border-2 border-[#4B3791] text-[#4B3791] bg-white shadow-md hover:bg-[#4B3791] hover:text-white transition-all duration-300 flex items-center gap-3 relative overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">About Us</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-4M12 8h.01"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Ensure no black backgrounds on mobile */
        @media (max-width: 639px) {
          section {
            background: #fff !important;
          }

          /* Reduce motion for mobile performance */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        }

        /* Mobile device detection override */
        @media (hover: none) and (pointer: coarse) {
          section {
            background: #fff !important;
          }
        }
      `}</style>
    </section>
  );
}
