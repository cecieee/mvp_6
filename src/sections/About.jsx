import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const initializeAnimations = () => {
      // Create a timeline for the scroll-triggered animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
          id: "main-timeline",
        },
      });

      // Initial setup - hide elements
      gsap.set([textRef.current], {
        opacity: 0,
        y: 50,
      });

      // Animate container first
      tl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.1"
      );

      // Animate gradient position
      tl.to(
        textRef.current,
        {
          backgroundPosition: "200% center",
          ease: "none",
        },
        0
      );

      // Enhanced typing effect with smooth animation
      const textContent = textRef.current;
      if (textContent) {
        // Split text into words and preserve spaces
        const words = textContent.textContent.split(" ");
        textContent.innerHTML = words
          .map(
            (word) =>
              `<span class="word" style="opacity: 0; display: inline;">${word}</span>`
          )
          .join(" ");

        const wordElements = textContent.querySelectorAll(".word");

        // Smooth typing effect animation
        gsap.to(wordElements, {
          opacity: 1,
          duration: 0.1, // Quick fade for each word
          stagger: {
            amount: 3, // Total duration for typing effect (3 seconds)
            ease: "none", // Linear for consistent typing rhythm
          },
          ease: "none", // No easing for crisp typing effect
          scrollTrigger: {
            trigger: textRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 1,
            id: "word-animation",
          },
        });

        // Pin animation
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinRef.current,
          pinSpacing: false,
          pinType: "fixed",
          id: "pin-animation",
        });
      }
    };

    // Initialize animations with a small delay
    const timer = setTimeout(() => {
      initializeAnimations();
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <section
        id="about"
        ref={sectionRef}
        className="px-4 bg-white h-[200vh] flex items-start pt-0"
      >
        <div
          className="max-w-7xl mx-auto w-full pt-30 relative z-10"
          ref={pinRef}
        >
          {/* Particle dots - pinned with content */}
          {Array.from({ length: 15 }).map((_, i) => {
            const baseX = (((i * 7 + 10) % 100) / 100) * 100;
            const baseY = (((i * 11 + 15) % 100) / 100) * 100;
            const scale = 1 + (i % 3) * 0.2;
            const glowIntensity = 12 + (i % 5) * 8;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full transition-all duration-200 ease-out animate-pulse z-0"
                style={{
                  left: `${baseX}%`,
                  top: `${baseY}%`,
                  animationDelay: `${i * 0.12}s`,
                  transform: `scale(${scale})`,
                  boxShadow: `0 0 ${glowIntensity}px #7152DE`,
                  background: "#7152DE",
                  filter: `blur(${(i % 4) * 0.4}px)`,
                  zIndex: -1,
                }}
              />
            );
          })}

          {/* Floating particles - pinned with content */}
          {Array.from({ length: 10 }).map((_, i) => {
            const baseTop = (((i * 13 + 20) % 90) / 100) * 100;
            const baseLeft = (((i * 17 + 25) % 90) / 100) * 100;
            const scale = 1 + (i % 4) * 0.15;
            const rotation = (i % 6) * 15;
            return (
              <div
                key={`floating-${i}`}
                className="absolute w-3 h-3 rounded-full animate-ping transition-all duration-200 ease-out z-0"
                style={{
                  top: `${baseTop}%`,
                  left: `${baseLeft}%`,
                  animationDelay: `${i * 0.18}s`,
                  animationDuration: `${2.5 + i * 0.15}s`,
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  opacity: 0.5,
                  background: "#4B3791",
                  boxShadow: "0 0 20px #4B3791",
                  zIndex: -1,
                }}
              />
            );
          })}
          {/* Title */}
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4"></h2>
          </div>

          <div>
            {/* Description Part */}
            <div className="space-y-6">
              <p
                ref={textRef}
                className="gradient-text text-2xl sm:text-4xl leading-relaxed font-semibold "
                style={{
                  fontFamily: "JerseyM54, sans-serif",
                  fontStyle: "normal",
                  fontWeight: 500,
                  background:
                    "linear-gradient(90deg, #4b074b 0%, #7152DE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "#7152DE",
                }}
              >
                IEEE Student Branch College of Engineering Chengannur is
                organizing MVP – Micro Volunteering Programme for IEEE members,
                aimed at enhancing volunteering skills, fostering networking and
                socializing within the Student Branch. The program aspires to
                create a dynamic platform for student leaders to connect across
                regions, share knowledge, explore applications, and cultivate
                innovative ideas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
