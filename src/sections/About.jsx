import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Create a timeline for the scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: true, // Enable markers for main timeline
        id: "main-timeline", // Add unique ID for debugging
      },
    });

    // Initial setup - hide elements
    gsap.set([titleRef.current, textRef.current], {
      opacity: 0,
      y: 50,
    });

    // Animate title first
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }).to(
      textRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.1"
    );

    // Finally animate the image

    // Create a separate animation for text reveal effect
    const textContent = textRef.current;
    if (textContent) {
      const words = textContent.textContent.split(" ");
      textContent.innerHTML = words
        .map((word) => `<span class="word" style="opacity: 0;">${word}</span>`)
        .join(" ");

      const wordElements = textContent.querySelectorAll(".word");

      // Create a separate ScrollTrigger for word animation with different trigger points
      gsap.to(wordElements, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 10%", // Changed from 80% to avoid conflict
          end: "bottom 30%", // Changed from 20% to avoid conflict
          scrub: 1,
          markers: true,
          id: "word-animation", // Add unique ID for debugging
        },
      });
      gsap.to(pinRef.current, {
        pin: true,
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {" "}
      {/* Extra height for scroll */}
      <section
        ref={sectionRef}
        className="py-16 px-4 bg-blue-500 h-[200vh] flex items-start"
      >
        <div className="max-w-7xl mx-auto w-full" ref={pinRef}>
          {/* Title */}
          <div className="text-left mb-12">
            <h2
              ref={titleRef}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              About
            </h2>
          </div>

          {/* Two-column layout */}
          <div>
            {/* Description Part */}
            <div className="space-y-6">
              <p
                ref={textRef}
                className="text-gray-600 text-4xl leading-relaxed"
              >
                IEEE Student Branch College of Engineering Chengannur (60451) is
                organizing MVP - Micro Volunteering Programme for IEEE members,
                to focus on the development of volunteering skills, to enable
                networking and socialising with fellow members from the Student
                Branch. The program looks forward to build a trailblazing
                platform for the student leaders to interact across regions to
                share their knowledge, find their best applications, cultivate
                different ideas and much more.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
