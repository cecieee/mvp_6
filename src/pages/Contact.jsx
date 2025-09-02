import React, { useEffect, useState } from "react";
import {
  FaPhone,
  FaClipboardList,
  FaBullhorn,
  FaGlobe,
  FaMapPin,
} from "react-icons/fa";

// Crew contacts
const crewContacts = [
  { name: "Siddharth R", role: "MDC", phone: "80893 72642" },
  { name: "Shijin Abraham", role: "Chairperson", phone: "8075015042" },
  { name: "Gowri EVB", role: "Secretary", phone: "8289859773" },
  { name: "Afrah Quamar", role: "Vice Chairperson", phone: "9633918910" },
  { name: "Aadikrishna", role: "Joint Secretary", phone: "8089690314" },
];

// Other teams
const otherSections = [
  {
    title: "Registration",
    icon: <FaClipboardList className="w-5 h-5" />,
    contacts: [
      { name: "Sreeganga D", role: "Registration", phone: "88485 78053" },
      { name: "Kashinadh A", role: "Registration", phone: "92077 90775" },
    ],
  },
  {
    title: "Point of Contact",
    icon: <FaBullhorn className="w-5 h-5" />,
    contacts: [
      {
        name: "Gouri Rajesh Pillai",
        role: "Point of contact",
        phone: "628293 1968",
      },
      { name: "Aparna Suresh", role: "Point of contact", phone: "89431 50049" },
    ],
  },
  {
    title: "Outreach",
    icon: <FaGlobe className="w-5 h-5" />,
    contacts: [
      { name: "Nandhu Prasad", role: "Outreach", phone: "90487 38741" },
      { name: "Anjana Ajith", role: "Outreach", phone: "859080 2488" },
      {
        name: "Nayan Shastham Valappil",
        role: "Outreach",
        phone: "956759 8490",
      },
      { name: "Rachana Chandra A", role: "Outreach", phone: "628221 2759" },
    ],
  },
  {
    title: "Web Team",
    icon: <FaGlobe className="w-5 h-5" />,
    contacts: [
      { name: "Harikrishna A", role: "Web Master", phone: "94955 09310" },
      {
        name: "Adithyan Valayil Sreeni",
        role: "Web Team",
        phone: "96562 98751",
      },
      { name: "Alwin Saji", role: "Web Team", phone: "94951 64693" },
      { name: "Aswin Ajikumar", role: "Web Team", phone: "85903 42134" },
      { name: "Sarin M S", role: "Web Team", phone: "62826 29447" },
    ],
  },
  {
    title: "Design Team",
    icon: <FaGlobe className="w-5 h-5" />,
    contacts: [
      { name: "Sreeparvathi MJ", role: "Design Team ", phone: "9605678526" },
      { name: "Jez Thomas P Kurien", role: "Design Team", phone: "8606177663" },
    ],
  },
];

// Rotation classes
const rotateOptions = [
  "rotate-[-2deg]",
  "rotate-[2deg]",
  "rotate-[-1deg]",
  "rotate-[1deg]",
];

// Contact card
const ContactCard = ({ name, role, phone }) => {
  const randomRotation =
    rotateOptions[Math.floor(Math.random() * rotateOptions.length)];

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

// Taped heading
const TapedHeading = ({ title }) => {
  const rotations = ["-2deg", "2deg", "-1deg", "1deg"];
  const randomRotate = rotations[Math.floor(Math.random() * rotations.length)];

  return (
    <div
      className="relative inline-block mb-6 px-6 py-3 bg-white shadow-md rounded-sm border border-gray-300 select-none"
      style={{ transform: `rotate(${randomRotate})` }}
    >
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-14 h-5 bg-yellow-300 rounded-t-md shadow-inner rotate-1"></div>
      <h2
        className="text-2xl"
        style={{
          fontFamily: "JerseyM54, sans-serif",
          background: "linear-gradient(90deg, #2A195B, #5C3BCE)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </h2>
    </div>
  );
};

// Team section
const TeamSection = ({ section }) => (
  <div className="mb-16 flex flex-col items-center w-full">
    <TapedHeading title={section.title} />
    <div className="flex justify-center w-full">
      <div
        className={`grid gap-6 justify-items-center ${
          section.contacts.length === 2
            ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
            : section.contacts.length === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl"
            : section.contacts.length === 5
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-6xl"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl"
        }`}
      >
        {section.contacts.map((person) => (
          <ContactCard key={person.name} {...person} />
        ))}
      </div>
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
    <div className="min-h-screen bg-[#E6E4F1] pt-24 px-4 sm:px-8 pb-8 flex items-center justify-center">
      <div
        className="w-full max-w-7xl bg-white p-6 sm:p-8 shadow-xl mx-auto"
        style={{
          borderWidth: "6px",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #2A195B, #5C3BCE)",
        }}
      >
        {/* Main Title */}
        <div className="text-center mb-16 sm:mb-20">
          <h1
            className="text-4xl sm:text-5xl"
            style={{
              fontFamily: "Frontline, sans-serif",
              background: "linear-gradient(90deg, #2A195B, #5C3BCE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Crew
          </h1>
        </div>

        {/* Crew Section (without subheading) */}
        <div className="mb-16 flex flex-col items-center w-full">
          <div className="flex justify-center w-full">
            <div
              className={`grid gap-6 justify-items-center ${
                crewContacts.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                  : crewContacts.length === 4
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl"
                  : crewContacts.length === 5
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-6xl"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl"
              }`}
            >
              {crewContacts.map((person) => (
                <ContactCard key={person.name} {...person} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
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

        {/* Sections */}
        <div className="flex flex-col items-center justify-center w-full">
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
