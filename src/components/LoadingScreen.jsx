import React, { useState, useEffect } from 'react'

function ProgressBar({ progress }) {
  return (
    <div className="w-[min(90%,20rem)] mx-auto mb-8 animate-fade-up">
      <div className="flex justify-between items-center mb-3 text-xs sm:text-sm">
        <span className="text-[#4B3791] font-medium">Loading</span>
        <span className="text-[#7152DE] font-semibold">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-[#1B1436]/40 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ 
            width: `${progress}%`,
            background: "#7152DE"
          }}
        />
      </div>
    </div>
  )
}

function LoadingText() {
  return (
    <div className="text-center mb-12 relative">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-40">
        <div className="smoke"></div>
        <div className="smoke"></div>
        <div className="smoke"></div>
      </div>

      {/* Title */}
      <div className="flex justify-center items-center gap-3 sm:gap-5 relative z-10">
        <span 
          className="font-bold animate-slide-left"
          style={{ 
            fontFamily: 'Frontline, sans-serif',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            color: "#fff"
          }}
        >
          MVP
        </span>
        <span 
          className="font-bold animate-slide-right"
          style={{ 
            fontFamily: 'Frontline, sans-serif',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            color: "#fff"
          }}
        >
          6.0
        </span>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i}
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-wave"
            style={{
              animationDelay: `${i * 0.2}s`,
              background: "#7152DE"
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setTimeout(() => onLoadingComplete?.(), 800)
          clearInterval(interval)
          return 100
        }
        return Math.min(prev + Math.random() * 3 + 1, 100)
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "#1B1436"
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: "linear-gradient(90deg, #7152DE 0%, #4B3791 100%)",
              boxShadow: "0 0 12px #7152DE",
              opacity: 0.5,
              animation: `floatUp ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <LoadingText />
        <ProgressBar progress={progress} />
      </div>

      <style jsx>{`
        /* Cinematic text animations */
        @keyframes slideLeft {
          0% { transform: translateX(-150%) scale(1.1); filter: blur(10px); opacity: 0; }
          60% { transform: translateX(20px) scale(1.05); filter: blur(2px); opacity: 1; }
          80% { transform: translateX(-5px) scale(1); filter: blur(0); }
          100% { transform: translateX(0) scale(1); }
        }
        @keyframes slideRight {
          0% { transform: translateX(150%) scale(1.1); filter: blur(10px); opacity: 0; }
          60% { transform: translateX(-20px) scale(1.05); filter: blur(2px); opacity: 1; }
          80% { transform: translateX(5px) scale(1); filter: blur(0); }
          100% { transform: translateX(0) scale(1); }
        }
        .animate-slide-left {
          animation: slideLeft 1.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }
        .animate-slide-right {
          animation: slideRight 1.8s cubic-bezier(0.77, 0, 0.175, 1) 0.2s forwards;
        }

        /* Glow pulse */
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 25px #7152DE; }
          50% { text-shadow: 0 0 45px #4B3791; }
        }
        .glow-text {
          animation: glowPulse 3s ease-in-out infinite 2s;
        }

        /* Wave dots */
        @keyframes wave {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        .animate-wave { animation: wave 1.4s infinite ease-in-out; }

        /* Fade-up for progress bar */
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 1s ease-out 0.6s both; }

        /* Smoke effect */
        @keyframes smokeMove {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.15; }
          50% { transform: translateY(-50px) scale(1.2); opacity: 0.1; }
          100% { transform: translateY(-100px) scale(1.4); opacity: 0; }
        }
        .smoke {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
          position: absolute;
          animation: smokeMove 7s ease-in-out infinite;
        }
        .smoke:nth-child(2) { animation-delay: 1.5s; transform: scale(1.2); }
        .smoke:nth-child(3) { animation-delay: 3s; transform: scale(0.8); }

        /* Particles floating */
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.4; }
          100% { transform: translateY(-200px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
