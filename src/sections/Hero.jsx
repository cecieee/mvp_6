import React, { useEffect, useState, useRef } from "react";
import { toast } from 'react-toastify';
import { FiClock } from 'react-icons/fi';
import PixelBlast from "../components/PixelBlast.jsx"
import GridBackground from "../components/GridBackground.jsx"

export default function Hero() {
  const [smoothMousePosition, setSmoothMousePosition] = useState({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const [viewport, setViewport] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 375,
    height: typeof window !== "undefined" ? window.innerHeight : 667,
  });

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

  const handleRegistrationClick = () => {
    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FiClock size={20} />
        <span>Registration will open soon!</span>
      </div>,
      {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "custom-toast",
        style: {
          background: "linear-gradient(135deg, #7152DE 0%, #4B3791 100%)",
          color: "white",
          borderRadius: "12px",
          fontSize: window.innerWidth < 640 ? "14px" : "16px",
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: "500",
          boxShadow: "0 10px 30px rgba(113, 82, 222, 0.3)",
          border: "none",
          margin: window.innerWidth < 640 ? "0 16px" : "0 24px",
          maxWidth: window.innerWidth < 640 ? "calc(100vw - 32px)" : "400px",
          width: "100%",
        },
        progressClassName: "white-progress",
        icon: false,
      }
    );
  };

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

      {/* PixelBlast Background - Mobile First */}
      <div 
        className="absolute z-10"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'auto',
          top: viewport.width >= 1024 ? '-10%' : '0',
          left: viewport.width >= 1024 ? '-5%' : '0',
          right: viewport.width >= 1024 ? 'auto' : '0',
          bottom: viewport.width >= 1024 ? 'auto' : '0',
          transform: viewport.width >= 1024 ? 'scale(1.1)' : 'none'
        }}
      >
        <PixelBlast
          variant="circle"
          pixelSize={viewport.width < 640 ? 3 : viewport.width < 1024 ? 4 : 6}
          color="#7152DE"
          patternScale={viewport.width < 640 ? 2 : viewport.width < 1024 ? 2.5 : 3}
          patternDensity={viewport.width < 640 ? 0.8 : viewport.width < 1024 ? 1.0 : 1.2}
          pixelSizeJitter={viewport.width < 640 ? 0.3 : 0.5}
          enableRipples={viewport.width >= 640}
          rippleSpeed={0.3}
          rippleThickness={0.1}
          rippleIntensityScale={viewport.width < 640 ? 1.0 : 1.5}
          liquid={viewport.width >= 768}
          liquidStrength={viewport.width < 1024 ? 0.08 : 0.12}
          liquidRadius={viewport.width < 1024 ? 1.0 : 1.2}
          liquidWobbleSpeed={viewport.width < 640 ? 3 : 5}
          speed={viewport.width < 640 ? 0.4 : 0.6}
          edgeFade={viewport.width < 640 ? 0.4 : 0.25}
          transparent
          mousePosition={smoothMousePosition}
          interactive
        />
      </div>

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
              onClick={handleRegistrationClick}
              className="group px-6 sm:px-8 py-3 font-semibold rounded-full border-2 border-[#7152DE] text-[#7152DE] bg-white shadow-md hover:bg-[#7152DE] hover:text-white transition-all duration-300 flex items-center gap-3 relative overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">Register Now</span>
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
        
        .white-progress {
          background: white !important;
        }
        
        .custom-toast .Toastify__progress-bar {
          background: white !important;
        }

        /* Mobile performance optimizations */
        @media (max-width: 639px) {
          .custom-toast {
            margin: 0 12px !important;
            max-width: calc(100vw - 24px) !important;
            font-size: 14px !important;
            padding: 12px 16px !important;
            border-radius: 10px !important;
          }
          
          .custom-toast div {
            gap: 6px !important;
          }
          
          .Toastify__toast-container--bottom-center {
            bottom: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: calc(100% - 24px) !important;
            max-width: none !important;
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

        /* Tablet responsive styles */
        @media (min-width: 640px) and (max-width: 1024px) {
          .custom-toast {
            margin: 0 20px !important;
            max-width: 350px !important;
            font-size: 15px !important;
          }
          
          .Toastify__toast-container--bottom-center {
            bottom: 24px !important;
          }
        }

        /* Desktop styles */
        @media (min-width: 1025px) {
          .Toastify__toast-container--bottom-center {
            bottom: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
