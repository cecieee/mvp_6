import React from "react";

export default function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden py-10"
      style={{ background: "#1B1436" }}
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <div className="flex items-center gap-4">
            <div>
              <h3
                className="text-2xl font-frontline font-bold"
                style={{
                  background:
                    "linear-gradient(90deg, #7152DE 0%, #4B3791 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                MVP 6.0
              </h3>
              <p className="text-[#7152DE] font-semibold text-sm">
                IEEE Student Branch CEC
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <div className="flex gap-6 mb-2">
              {[
                { name: "Home", href: "/" },
                { name: "Tasks", href: "/tasks" },
                { name: "Leaderboard", href: "/leaderboard" },
                { name: "Contact", href: "/contact" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="font-semibold text-white/80 hover:text-[#7152DE] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
            {/* Social Media */}
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.instagram.com/ieee_sb_cec/"
                target="_blank"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#7152DE]/20 hover:bg-[#7152DE]/40 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 text-[#7152DE]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/cecieee/"
                target="_blank"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#4B3791]/20 hover:bg-[#4B3791]/40 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 text-[#4B3791]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-end md:items-end text-right gap-1">
            <p className="text-white/90 text-sm">📱 +91 12345 67890</p>
            <p className="text-white/90 text-sm">📧 ieee@ceconline.edu</p>
            <p className="text-white/70 text-xs">CE Chengannur</p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-white/80 mb-2 sm:mb-0">© 2025 IEEE SB CEC</p>
          <div className="flex items-center space-x-2 text-white/70">
            <span>Made with</span>
            <span className="text-[#7152DE] animate-pulse">❤️</span>
            <span>by IEEE SB CEC</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#7152DE] via-[#4B3791] to-[#7152DE]"></div>
    </footer>
  );
}
