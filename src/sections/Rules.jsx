import React from "react";
import AccordionItem from "../components/AccordionItem";

const rules = [
  {
    title: "IEEE Membership",
    content:
      "To enroll in the volunteering program, the student must have a valid IEEE membership ID.",
  },
  {
    title: "Task Schedule",
    content: "Online tasks will be provided to the volunteers on alternate days.",
  },
  {
    title: "Task Submission",
    content:
      "Reports of the completed task should be submitted via the Google Form that will be provided along with each task.",
  },
  {
    title: "Rewards",
    content:
      "The successful completion of each task will reward you with points.",
  },
];

function Rules() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center overflow-hidden p-4">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Rules
        </h1>
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <AccordionItem key={index} title={rule.title}>
              {rule.content}
            </AccordionItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rules;
