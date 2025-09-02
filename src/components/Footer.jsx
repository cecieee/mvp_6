import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPhone, FiMail, FiInstagram, FiLinkedin, FiMapPin, FiHeart, FiGlobe, FiUsers, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (href) => {
    navigate(href);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0520 0%, #1a1335 50%, #0f0728 100%)",
      }}
    >
      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(113, 82, 222, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(113, 82, 222, 0.4) 1px, transparent 1px),
              linear-gradient(rgba(147, 51, 234, 0.2) 0.5px, transparent 0.5px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.2) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <div
              className="w-2 h-2 bg-purple-400/30 rounded-full blur-sm"
              style={{
                boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-12">
              
              {/* Brand Section */}
              <div className="flex flex-col items-center lg:items-start lg:flex-shrink-0 space-y-3 sm:space-y-4">
                <div className="flex flex-col items-center lg:items-start gap-2 sm:gap-3">
                  <img src="/logos/IEEE-logo.webp" alt="IEEE Logo" className="h-8 sm:h-10 lg:h-12 w-auto" />
                  <img src="/logos/IEEE-SB-logo.webp" alt="IEEE SB Logo" className="mt-7 h-8 sm:h-10 lg:h-12 w-auto" />
                </div>
              </div>

              {/* MVP Logo Center */}
              <div className="flex-shrink-0 flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                <div className="text-center">
                  <img
                    src="/logos/mvp_title_white.webp"
                    alt="MVP 6.0"
                    className="h-8 sm:h-10 lg:h-12 w-auto mx-auto mb-2"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                    }}
                  />
                  <p className="text-purple-200 text-xs sm:text-sm font-medium">Micro Volunteering Programme</p>
                </div>
              </div>

              {/* Links and Contact Section */}
              <div className="flex flex-col sm:flex-row lg:flex-row gap-6 sm:gap-8 lg:gap-16 justify-center sm:justify-start lg:justify-end">
                {/* Quick Links */}
                {/* <div className="space-y-3 text-center sm:text-left">
                  <h4 className="text-sm sm:text-base font-semibold text-white">Quick Links</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {['Home', 'About', 'Events', 'Contact'].map((link) => (
                      <button
                        key={link}
                        onClick={() => handleNavigation(link.toLowerCase())}
                        className="block w-full text-gray-300 hover:text-white hover:translate-x-0 sm:hover:translate-x-1 transition-all duration-300 text-center sm:text-left text-xs sm:text-sm py-1"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div> */}

                {/* Contact Info */}
                <div className="space-y-3 text-center sm:text-left">
                  <h4 className="text-sm sm:text-base text-white" style={{ fontFamily: "JerseyM54, sans-serif" }}>CONTACT</h4>
                  <div className="space-y-2 sm:space-y-3">
                    <a
                      href="mailto:chairman_ieee@ceconline.edu"
                      className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-purple-500/20 group-hover:bg-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                        <FiMail className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
                      </div>
                      <span className="text-xs sm:text-sm">chairman_ieee@ceconline.edu</span>
                    </a>
                    <a
                      href="https://maps.google.com/?q=College+of+Engineering+Chengannur"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-center sm:justify-start gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-purple-500/20 group-hover:bg-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 mt-0.5">
                        <FiMapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
                      </div>
                      <span className="text-xs sm:text-sm leading-relaxed text-center sm:text-left">
                        College of Engineering<br />Chengannur
                      </span>
                    </a>
                    
                    {/* Social Media Icons */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 pt-2">
                      <a
                        href="https://www.instagram.com/ieee_sb_cec/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-pink-500/20 to-pink-600/20 hover:from-pink-500/30 hover:to-pink-600/30 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 to-pink-600/0 group-hover:from-pink-400/10 group-hover:to-pink-600/10 transition-all duration-300"></div>
                        <FiInstagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-300 group-hover:text-pink-200 transition-colors duration-300 relative z-10" />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/cecieee/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-600/0 group-hover:from-blue-400/10 group-hover:to-blue-600/10 transition-all duration-300"></div>
                        <FiLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300 group-hover:text-blue-200 transition-colors duration-300 relative z-10" />
                      </a>
                      
                      <button
                        onClick={scrollToTop}
                        className="group w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 rounded-lg flex items-center justify-center transition-all duration-300 ml-1"
                      >
                        <FiArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-purple-300 group-hover:text-purple-200 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-center items-center">
            <div className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm text-gray-400 text-center">
              <span>© 2025 IEEE SB CEC Web Team.</span>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <FiHeart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 animate-pulse" />
                <span>by IEEE SB CEC Web Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}