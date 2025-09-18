import React from "react";
import {
  FaTasks,
  FaExclamationCircle,
  FaClock,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";
import GridBackground from "../components/GridBackground.jsx";

export default function Tasks() {
  const today = new Date();

  const tasks = [
    // ACTIVE TASKS
    {
      title: "Podcast Based on an IEEE Research Paper",
      status: "Active",
      desc: "Prepare a podcast based on an IEEE research paper of your choice. The podcast should explain the core concepts, objectives, methodology and key findings of the paper in a simple and engaging way. Ensure that the content is well-structured, easy to follow and suitable for a general audience with basic technical understanding. Upload your audio file or written podcast script through the provided Google Form link.",
      due: "20 September 2025, 11.59 PM", //Due Date || YYYY-MM-DD
      points: 15,
      submissionLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSd6VM6J7iPArv-VqnKcuBAR4Z5JmqtqCg_t7AS81K1uUnQRxA/viewform?usp=dialog"
    },
    {
      title: "Make 6 Connections in IEEE Collabratec",
      status: "Completed",
      desc: "IEEE Collabratec is an integrated online platform where technology professionals can network, collaborate and share resources. It provides opportunities to connect with peers, discover research and expand your professional circle within IEEE.Your task is to log in to IEEE Collabratec and build at least 6 new professional connections. Upload a screenshot showing your profile with 6+ connections as proof of completion.",
      due: "17 September 2025, 12.00 PM", //Due Date || YYYY-MM-DD
      points: 20,
      submissionLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSfYcSlA3XEKOwmo8GhM2Abv3FAKhfSEW9Tfib6wWjRQ4GNvZQ/viewform?usp=dialog",
    },
    {
      title: "Download IEEE Application & Membership Card",
      status: "Completed",
      desc: "Install IEEE mobile application from Play Store or App Store and upload a screenshot as proof of completion.Download your IEEE Membership Card and submit it as a PDF file.",
      due: "15 September 2025, 12.00 PM", //Due Date || YYYY-MM-DD
      points: 10,
      submissionLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdOtZ4xAzO97a4aA6JYqADFYEELsdgvK0SpbUdSws8PTBud9g/viewform?usp=dialog",
    },
    {
      title: "Follow IEEE SB CEC on Social Media",
      status: "Completed",
      desc: "Stay updated with all the latest events, opportunities, and initiatives from IEEE SB CEC by following us on our official social media pages. Once you have followed, upload the screenshots as proof of completion through the given Submission Link. ",
      due: "12 September 2025, 12.00 PM", //Due Date || YYYY-MM-DD
      points: 10,
      submissionLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSe8DzjIhEHMrO9d2BV-FJ1ODAI6vw-QXsvlpwuYAeSCb2EHeg/viewform?usp=dialog",
    },
    {
      title: "Create a LinkedIn Account & Share Your Profile",
      status: "Completed",
      desc: "LinkedIn is the most effective and fastest professional networking platform that offers new opportunities every day. It connects people with their professional designations and helps in building essential relationships. Having a LinkedIn profile serves as a guide to quickly find a job and establish valuable professional connections.Your task is to create a LinkedIn account, set up your profile and share it as proof of completion.",
      due: "14 September 2025, 12.00 PM", //Due Date || YYYY-MM-DD
      points: 15,
      submissionLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSf-PANukYcEawQpAhRGPLqMOqo-gIT_vPvuQ9nDF1lkuQT2Ww/viewform?usp=dialog",
    },
  ];

  const activeTasks = tasks.filter((task) => task.status === "Active");
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const upcomingTasks = tasks.filter((task) => task.status === "Upcoming");

  const totalTasks = tasks.length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const statusStyles = {
    Active: "bg-blue-100 text-blue-800",
    Completed: "bg-red-100 text-red-800",
    Upcoming: "bg-orange-100 text-orange-800",
  };

  const borderShadowStyles = {
    Active:
      "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
    Completed:
      "border-red-600 shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:shadow-red-00 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]",
    Upcoming:
      "border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]",
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 relative">
      <GridBackground opacity={0.3} zIndex={0} />
      {/* Header */}
      <div className="text-center pt-16 pb-8 px-4 relative z-10">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl mb-6"
          style={{
            fontFamily: "Frontline, sans-serif",
            background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "2px",
          }}>
          TASKS
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#7152DE] to-[#4B3791] mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Progress */}
          {/* <div className="bg-indigo-50 rounded-xl p-6 shadow-sm border border-indigo-200">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">
              Overall Progress
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 relative mb-3">
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#4f46e5"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
                  {totalTasks > 0 ? `${progress}%` : "0%"}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Completed: {completedTasks.length} / {totalTasks || 0}
              </p>
            </div>
          </div> */}

          {/* Task Overview */}
          <div className="bg-purple-50 rounded-xl p-6 shadow-sm border border-purple-200">
            <h2 className="text-lg font-semibold mb-4 text-purple-700">
              Task Overview
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaTasks className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-blue-700">Active</p>
                  <p className="text-sm text-gray-500">
                    {activeTasks.length} tasks
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaCheckCircle className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-red-700">Expired</p>
                  <p className="text-sm text-gray-500">
                    {completedTasks.length} tasks
                  </p>
                </div>
              </li>
              {/* <li className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaClock className="text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-orange-700">Upcoming</p>
                  <p className="text-sm text-gray-500">
                    {upcomingTasks.length} tasks
                  </p>
                </div>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Main Tasks Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Check if there are no tasks */}
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full p-8 mb-6 shadow-lg">
                <FaClipboardList className="text-6xl text-purple-600" />
              </div>
              <h2
                className="text-3xl font-bold mb-4 text-center"
                style={{
                  fontFamily: "JerseyM54, sans-serif",
                  background:
                    "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                No Tasks Available
              </h2>
              <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
                Tasks will be released soon! Stay tuned for exciting challenges
                and opportunities to showcase your skills.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-200 max-w-sm">
                <div className="flex items-center gap-3 text-purple-700">
                  <FaClock className="text-purple-500" />
                  <div>
                    <p className="font-semibold">Coming Soon</p>
                    <p className="text-sm text-gray-600">
                      Keep checking back for updates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Active Tasks */}
              {activeTasks.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Active Tasks
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {activeTasks.map((task, index) => (
                      <div
                        key={index}
                        className={`bg-white p-5 border rounded-tl-xl rounded-br-xl transition-shadow duration-300 ${
                          borderShadowStyles[task.status]
                        } flex flex-col`}>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full self-start ${
                            statusStyles[task.status]
                          }`}>
                          {task.status}
                        </span>
                        <h3 className="text-lg font-semibold mt-3 mb-2 text-gray-900">
                          {task.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 flex-grow">
                          {task.desc}
                        </p>
                        <p className="text-gray-700 text-md mb-4 flex-grow">
                          Points: {task.points}
                        </p>
                        <div className="text-xs text-gray-500 mb-4">
                          Due: {task.due}
                        </div>

                        {/* Submit Task Button */}
                        <button
                          onClick={() =>
                            window.open(task.submissionLink || "#", "_blank")
                          }
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer">
                          <FaClipboardList className="w-4 h-4" />
                          Submit Task
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Tasks */}
              {completedTasks.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Expired Tasks
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {completedTasks.map((task, index) => (
                      <div
                        key={index}
                        className={`bg-white p-5 border rounded-tl-xl rounded-br-xl transition-shadow duration-300 ${
                          borderShadowStyles[task.status]
                        } opacity-90`}>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            statusStyles[task.status]
                          }`}>
                          ✓ Expired
                        </span>
                        <h3 className="text-lg font-semibold mt-3 mb-2 text-gray-900">
                          {task.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {task.desc}
                        </p>
                        <div className="text-xs text-gray-500">
                          Completed: {task.due}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
