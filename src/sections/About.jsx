import React, { useEffect, useRef } from "react";
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
        ref={sectionRef}
        className="px-4 bg-black h-[200vh] flex items-start pt-0"
      >
        <div className="max-w-7xl mx-auto w-full pt-30" ref={pinRef}>
          {/* Title */}
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4"></h2>
          </div>

          {/* Two-column layout */}
          <div>
            {/* Description Part */}
            <div className="space-y-6">
              <p
                ref={textRef}
                className="text-gray-600 text-2xl sm:text-4xl leading-relaxed font-semibold"
                style={{
                  fontFamily: '"Instrument Sans", sans-serif',
                  fontStyle: "normal",
                  fontWeight: 600,
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
