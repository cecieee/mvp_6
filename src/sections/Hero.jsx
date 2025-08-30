import React, { useEffect, useState, useRef } from "react";

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
        className="absolute inset-0 z-0 pointer-events-none"
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
      {/* Particle dots */}
      {Array.from({ length: 15 }).map((_, i) => {
        const vw = viewport.width;
        const vh = viewport.height;
        const baseX = (((i * 7 + 10) % 100) / 100) * vw;
        const baseY = (((i * 11 + 15) % 100) / 100) * vh;
        const scale = 1 + ((i % 3) * 0.2);
        const glowIntensity = (vw < 640 ? 8 : 12) + (i % 5) * (vw < 640 ? 4 : 8);
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full transition-all duration-200 ease-out animate-pulse"
            style={{
              left: `${baseX}px`,
              top: `${baseY}px`,
              animationDelay: `${i * 0.12}s`,
              transform: `scale(${scale})`,
              boxShadow: `0 0 ${glowIntensity}px #7152DE`,
              background: "#7152DE",
              filter: `blur(${(i % 4) * (vw < 640 ? 0.2 : 0.4)}px)`,
            }}
          />
        );
      })}

      {/* Floating particles */}
      {Array.from({ length: 10 }).map((_, i) => {
        const vw = viewport.width;
        const vh = viewport.height;
        const baseTop = (((i * 13 + 20) % 90) / 100) * vh;
        const baseLeft = (((i * 17 + 25) % 90) / 100) * vw;
        const scale = 1 + ((i % 4) * 0.15);
        const rotation = (i % 6) * 15;
        return (
          <div
            key={`floating-${i}`}
            className="absolute w-3 h-3 rounded-full animate-ping transition-all duration-200 ease-out"
            style={{
              top: `${baseTop}px`,
              left: `${baseLeft}px`,
              animationDelay: `${i * 0.18}s`,
              animationDuration: `${2.5 + i * 0.15}s`,
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              opacity: 0.5,
              background: "#4B3791",
              boxShadow: "0 0 20px #4B3791",
            }}
          />
        );
      })}

      {/* Matrix lines */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => {
          const translateX = smoothMousePosition.x * 8;
          const scaleY = 1 + Math.abs(smoothMousePosition.y) * 0.15;
          const opacity =
            0.03 +
            Math.abs(smoothMousePosition.x + smoothMousePosition.y) * 0.02;
          return (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-[#7152DE] to-transparent animate-pulse transition-all duration-500 ease-out"
              style={{
                left: `${i * 5 + 2}%`,
                height: "100%",
                animationDuration: `${4 + i * 0.2}s`,
                animationDelay: `${i * 0.1}s`,
                transform: `translateX(${translateX}px) scaleY(${scaleY})`,
                opacity: opacity,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-6 relative z-30">
        <div className="text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-frontline mb-4 pr-3 animate-fade-in-up"
            style={{
              fontFamily: "Frontline, sans-serif",
              background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "#7152DE",
              animation: "fadeInUp 1.2s ease-out",
              letterSpacing: "-0.02em",
            }}
          >
            MVP 6.0
          </h1>

          <p
            className="text-2xl md:text-3xl lg:text-4xl mb-3 max-w-4xl mx-auto leading-relaxed font-bold"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              color: "#1C1538",
              background: "linear-gradient(90deg, #7152DE 0%, #4B3791 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="font-bold">INNOVATE</span>
            <span className="mx-3 text-[#7152DE] opacity-100">•</span>
            <span className="font-bold">CONNECT</span>
            <span className="mx-3 text-[#7152DE] opacity-100">•</span>
            <span className="font-bold">INSPIRE</span>
          </p>

          <p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-80"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              color: "#4B3791",
              animation: "fadeInUp 1.2s ease-out 0.3s both",
            }}
          >
            Join us for an extraordinary journey of innovation and discovery
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            style={{ animation: "fadeInUp 1.2s ease-out 0.6s both" }}
          >
            <button className="group px-8 py-3 font-semibold rounded-full border-2 border-[#7152DE] text-[#7152DE] bg-white shadow-md hover:bg-[#7152DE] hover:text-white transition-all duration-300 flex items-center gap-3 relative overflow-hidden">
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
              className="group px-8 py-3 font-semibold rounded-full border-2 border-[#4B3791] text-[#4B3791] bg-white shadow-md hover:bg-[#4B3791] hover:text-white transition-all duration-300 flex items-center gap-3 relative overflow-hidden"
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

      <style jsx>{`
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
      `}</style>
    </section>
  );
}
