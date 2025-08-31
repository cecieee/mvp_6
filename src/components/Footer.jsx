import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPhone, FiMail, FiInstagram, FiLinkedin, FiMapPin } from "react-icons/fi";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (href) => {
    navigate(href);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tasks", href: "/tasks" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="relative text-white overflow-hidden py-8"
      style={{
        background: "linear-gradient(to right, #3A2F5A, #2A1F4A, #3A2F5A)",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7152DE] via-[#4B3791] to-[#7152DE]"></div>

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
          repeating-linear-gradient(
            to right,
            rgba(113,82,222,0.08) 0px,
            rgba(113,82,222,0.08) 1.5px,
            transparent 1.5px,
            transparent 48px
          ),
          repeating-linear-gradient(
            to bottom,
            rgba(113,82,222,0.08) 0px,
            rgba(113,82,222,0.08) 1.5px,
            transparent 1.5px,
            transparent 48px
          )
        `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: "18px",
              height: "18px",
              left: `${(i * 12 + 20) % 100}%`,
              top: `${(i * 17 + 30) % 100}%`,
              background: "#7152DE",
              boxShadow: `0 0 ${14 + i * 2}px #7152DE`,
              opacity: 0.18 + (i % 3) * 0.08,
              filter: `blur(${(i % 3) + 1}px)`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main content*/}
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between md:items-center">
          {/* Logo section */}
          <div className="text-center md:text-left order-2 md:order-1">
            <button onClick={() => handleNavigation("/")} className="cursor-pointer">
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-frontline mb-2 px-3 rounded-md"
                style={{
                  fontFamily: "Frontline, sans-serif",
                  background: "linear-gradient(90deg, #FFFFFF 0%, #E8E0FF 50%, #FFFFFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 20px rgba(255,255,255,0.5)",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              >
                MVP 6.0
              </h3>
            </button>
            <p className="text-purple-200 text-xs sm:text-sm font-medium">Micro Volunteering Programme</p>
          </div>

          {/* Social Media*/}
          <div className="text-center order-1 md:order-2">
            <p className="text-purple-200 text-xs sm:text-sm font-medium mb-3">Connect with us</p>
            <div className="flex gap-4 sm:gap-6 justify-center">
              <a
                href="https://www.instagram.com/ieee_sb_cec/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-[#7152DE]/60 hover:border-[#7152DE]/50 transition-all duration-300 shadow-lg"
              >
                <FiInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/cecieee/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-[#7152DE]/60 hover:border-[#7152DE]/50 transition-all duration-300 shadow-lg"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact info*/}
          <div className="text-center md:text-right order-3 md:order-3">
            <p className="text-purple-200 text-xs sm:text-sm font-medium mb-3">Get in touch</p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center md:justify-end text-white/90 text-xs sm:text-sm">
                <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#7152DE] flex-shrink-0" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center justify-center md:justify-end text-white/90 text-xs sm:text-sm">
                <FiMail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#7152DE] flex-shrink-0" />
                <span>ieee@ceconline.edu</span>
              </div>
              <div className="flex items-center justify-center md:justify-end text-white/90 text-xs sm:text-sm">
                <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#7152DE] flex-shrink-0" />
                <span>CE Chengannur</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center space-y-3 sm:space-y-0 sm:flex sm:justify-between sm:items-center text-xs sm:text-sm">
          <p className="text-white/80">© 2025 IEEE SB CEC</p>
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-white/70">
            <span>Made with</span>
            <span className="text-[#7152DE] animate-pulse text-sm sm:text-base">❤️</span>
            <span>by IEEE SB CEC</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#7152DE] via-[#4B3791] to-[#7152DE]"></div>
    </footer>
  );
}
