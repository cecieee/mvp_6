import React, { useEffect, useState, useRef } from "react";
import { toast } from 'react-toastify';
import { FiClock } from 'react-icons/fi';
import PixelBlast from "../components/PixelBlast.jsx"

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
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      {/* Black grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to right,
              rgba(0,0,0,0.08) 0px,
              rgba(0,0,0,0.08) 1.5px,
              transparent 1.5px,
              transparent 64px
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(0,0,0,0.08) 0px,
              rgba(0,0,0,0.08) 1.5px,
              transparent 1.5px,
              transparent 64px
            )
          `,
          backgroundSize: "64px 64px",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-30">
        <div className="text-center relative">
          <div style={{ 
            position: 'absolute',
            top: '-80vh',
            left: '-50vw',
            width: '200vw',
            height: '200vh',
            zIndex: 1,
            pointerEvents: 'auto'
          }}>
            <PixelBlast
              variant="circle"
              pixelSize={6}
              color="#7152DE"
              patternScale={3}
              patternDensity={1.2}
              pixelSizeJitter={0.5}
              enableRipples
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={0.6}
              edgeFade={0.25}
              transparent
            />
          </div>

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

        /* Mobile responsive styles */
        @media (max-width: 640px) {
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
        }

        /* Tablet responsive styles */
        @media (min-width: 641px) and (max-width: 1024px) {
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
