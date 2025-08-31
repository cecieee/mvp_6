import React, { useEffect, useState } from "react";
import {
  FaPhone,
  FaClipboardList,
  FaBullhorn,
  FaGlobe,
  FaMapPin,
} from "react-icons/fa";

// Crew data
const crewContacts = [
  { name: "Alexander Chen", role: "Chief Technology Officer", phone: "+1-202-555-0101" },
  { name: "Sophia Rodriguez", role: "Head of Product Development", phone: "+1-202-555-0102" },
  { name: "Benjamin Lee", role: "Lead Software Engineer", phone: "+1-202-555-0103" },
  { name: "Olivia Martinez", role: "Senior UI/UX Designer", phone: "+1-202-555-0104" },
];

// Other sections
const otherSections = [
  {
    title: "Registration",
    icon: <FaClipboardList className="w-5 h-5" />,
    contacts: [
      { name: "Daniel Kin", role: "Registration Manager", phone: "+1-202-555-0105" },
      { name: "Emily Watson", role: "Support Specialist", phone: "+1-202-555-0106" },
      { name: "Michael Brown", role: "Data Entry Coordinator", phone: "+1-202-555-0107" },
    ],
  },
  {
    title: "Outreach",
    icon: <FaBullhorn className="w-5 h-5" />,
    contacts: [
      { name: "Jessica Davis", role: "Head of Community Engagement", phone: "+1-202-555-0108" },
      { name: "Christopher White", role: "Partnership Development Lead", phone: "+1-202-555-0109" },
      { name: "Sarah Johnson", role: "Content & Social Media Manager", phone: "+1-202-555-0110" },
      { name: "Matthew Miller", role: "Event Marketing Specialist", phone: "+1-202-555-0111" },
    ],
  },
  {
    title: "Website",
    icon: <FaGlobe className="w-5 h-5" />,
    contacts: [
      { name: "Chloe Wilson", role: "Web Development Lead", phone: "+1-202-555-0112" },
      { name: "David Taylor", role: "Frontend Developer", phone: "+1-202-555-0113" },
      { name: "Grace Thompson", role: "Backend Engineer", phone: "+1-202-555-0114" },
    ],
  },
];

// Rotation classes for sticky note effect
const rotateOptions = [
  "rotate-[-2deg]",
  "rotate-[2deg]",
  "rotate-[-1deg]",
  "rotate-[1deg]",
];

// Contact card component
const ContactCard = ({ name, role, phone }) => {
  const randomRotation = rotateOptions[Math.floor(Math.random() * rotateOptions.length)];

  return (
    <div
      className={`relative bg-[#FDF3C6] border-l-4 border-[#FAD35D] shadow-lg rounded-sm p-4 w-full transform ${randomRotation} transition duration-300 ease-in-out hover:scale-[1.03]`}
    >
      <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 z-10">
        <FaMapPin className="text-red-500 w-5 h-5 drop-shadow" />
      </div>
      <div className="text-sm text-gray-800 select-text">
        <p className="font-bold">{name}</p>
        <p className="text-xs text-gray-600">{role}</p>
        <div className="flex items-center mt-2 text-xs">
          <FaPhone className="mr-1 text-[#5C3BCE]" />
          {phone}
        </div>
      </div>
    </div>
  );
};

// Heading component with gradient text and taped effect
const TapedHeading = ({ title }) => {
  const rotations = ["-2deg", "2deg", "-1deg", "1deg"];
  const randomRotate = rotations[Math.floor(Math.random() * rotations.length)];

  return (
    <div
      className="relative inline-block mb-6 px-6 py-3 bg-white shadow-md rounded-sm border border-gray-300 select-none"
      style={{ transform: `rotate(${randomRotate})` }}
    >
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-14 h-5 bg-yellow-300 rounded-t-md shadow-inner rotate-1 animate-pulse"></div>
      <h2
        className="text-2xl font-bold"
        style={{
          background: "linear-gradient(90deg, #2A195B, #5C3BCE)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title} Team
      </h2>
    </div>
  );
};

// Section for each group (Registration, Outreach, etc.)
const TeamSection = ({ section }) => (
  <div className="mb-16 flex flex-col items-center">
    <TapedHeading title={section.title} />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {section.contacts.map((person) => (
        <ContactCard key={person.name} {...person} />
      ))}
    </div>
  </div>
);

// Main contact component
export default function Contact() {
  const [activeSection, setActiveSection] = useState("Registration");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#E6E4F1] pt-24 px-8 pb-8 flex items-center justify-center">
      <div
        className="w-full max-w-5xl bg-white p-8 rounded-[60px] shadow-xl"
        style={{
          borderWidth: "6px",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #2A195B, #5C3BCE)",
        }}
      >
        {/* Main Title */}
        <h1
          className="text-center font-extrabold text-5xl mb-20"
          style={{
            background: "linear-gradient(90deg, #2A195B, #5C3BCE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          The Crew
        </h1>

        {/* Crew Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20 justify-center">
          {crewContacts.map((person) => (
            <ContactCard key={person.name} {...person} />
          ))}
        </div>

        {/* Mobile Navigation for Sections */}
        {isMobile && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {otherSections.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(section.title)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition ${
                  activeSection === section.title
                    ? "bg-[#5C3BCE] text-white border-[#5C3BCE]"
                    : "bg-white text-[#2A195B] border-[#5C3BCE] hover:bg-[#2A195B] hover:text-white"
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </div>
        )}

        {/* Section Content */}
        <div className="flex flex-col items-center justify-center">
          {otherSections.map(
            (section) =>
              (!isMobile || activeSection === section.title) && (
                <TeamSection key={section.title} section={section} />
              )
          )}
        </div>
      </div>
    </div>
  );
}
