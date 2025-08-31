import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const initializeAnimations = () => {
      // Initial setup - hide elements
      gsap.set([textRef.current], {
        opacity: 0,
        y: 50,
      });

      // Simple fade in animation on scroll
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

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
          duration: 0.05,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
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
    <section
      id="about"
      ref={sectionRef}
      className="px-4 sm:px-6 lg:px-8 bg-white py-20 relative"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{
              fontFamily: "Frontline, sans-serif",
              background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About MVP 6.0
          </h2>
        </div>

        <div>
          {/* Description Part */}
          <div className="space-y-6">
            <p
              ref={textRef}
              className="gradient-text text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed font-semibold max-w-5xl mx-auto text-center"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontStyle: "normal",
                fontWeight: 500,
                background:
                  "linear-gradient(90deg, #4b074b 0%, #7152DE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "#7152DE",
                lineHeight: "1.4",
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
  );
};

export default About;