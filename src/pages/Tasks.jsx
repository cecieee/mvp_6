import React from "react";
import {
  FaTasks,
  FaExclamationCircle,
  FaClock,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";

export default function Tasks() {
  const today = new Date();

  const tasks = [
    /*
    // Completed Tasks (past due dates)
    {
      title: "Setup Development Environment",
      status: "Completed",
      desc: "Install and configure development tools, IDE, and project dependencies.",
      due: "2025-01-05",
      completed: true,
    },
    {
      title: "Database Schema Design",
      status: "Completed",
      desc: "Design and implement the database structure for user management.",
      due: "2025-01-08",
      completed: true,
    },
    {
      title: "User Authentication System",
      status: "Completed",
      desc: "Implement user login, registration, and session management.",
      due: "2025-01-12",
      completed: true,
    },

    // Active Tasks
    {
      title: "Frontend Dashboard Design",
      status: "Active",
      desc: "Create responsive dashboard UI with modern design principles.",
      due: "2025-01-20",
      completed: false,
    },
    {
      title: "API Integration",
      status: "Active",
      desc: "Connect frontend with backend APIs and handle data flow.",
      due: "2025-01-22",
      completed: false,
    },
    {
      title: "User Profile Management",
      status: "Active",
      desc: "Implement user profile editing and settings functionality.",
      due: "2025-01-25",
      completed: false,
    },

    // Upcoming Tasks (future due dates)
    {
      title: "Performance Optimization",
      status: "Upcoming",
      desc: "Optimize application performance and reduce loading times.",
      due: "2025-02-01",
      completed: false,
    },
    {
      title: "Testing & QA",
      status: "Upcoming",
      desc: "Conduct comprehensive testing and quality assurance.",
      due: "2025-02-05",
      completed: false,
    },
    {
      title: "Security Implementation",
      status: "Upcoming",
      desc: "Implement security measures and vulnerability assessments.",
      due: "2025-02-10",
      completed: false,
    },
    {
      title: "Documentation",
      status: "Upcoming",
      desc: "Create comprehensive project documentation and user guides.",
      due: "2025-02-15",
      completed: false,
    },
    {
      title: "Deployment Setup",
      status: "Upcoming",
      desc: "Configure production environment and deployment pipelines.",
      due: "2025-02-20",
      completed: false,
    },*/
  ];

  const activeTasks = tasks.filter((task) => task.status === "Active");
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const upcomingTasks = tasks.filter((task) => task.status === "Upcoming");

  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const statusStyles = {
    Active: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Upcoming: "bg-orange-100 text-orange-800",
  };

  const borderShadowStyles = {
    Active:
      "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
    Completed:
      "border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]",
    Upcoming:
      "border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]",
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* Header */}
      <div className="text-center pt-16 pb-8 px-4">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6"
          style={{
            fontFamily: "Frontline, sans-serif",
            background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "2px",
          }}
        >
          TASKS
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#7152DE] to-[#4B3791] mx-auto rounded-full mb-8"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Progress */}
          <div className="bg-indigo-50 rounded-xl p-6 shadow-sm border border-indigo-200">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">
              Overall Progress
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 relative mb-3">
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 100 100"
                >
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
                  {totalTasks > 0 ? `${progress}%` : '0%'}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Completed: {completedTasks.length} / {totalTasks || 0}
              </p>
            </div>
          </div>

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
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaCheckCircle className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-700">Completed</p>
                  <p className="text-sm text-gray-500">
                    {completedTasks.length} tasks
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaClock className="text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-orange-700">Upcoming</p>
                  <p className="text-sm text-gray-500">
                    {upcomingTasks.length} tasks
                  </p>
                </div>
              </li>
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
                  fontFamily: "Frontline, sans-serif",
                  background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                No Tasks Available
              </h2>
              <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
                Tasks will be released soon! Stay tuned for exciting challenges and opportunities to showcase your skills.
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
                        className={`bg-white p-5 border rounded-tl-xl rounded-br-xl transition-shadow duration-300 ${borderShadowStyles[task.status]}`}
                      >
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[task.status]}`}
                        >
                          {task.status}
                        </span>
                        <h3 className="text-lg font-semibold mt-3 mb-2 text-gray-900">
                          {task.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{task.desc}</p>
                        <div className="text-xs text-gray-500">Due: {task.due}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Tasks */}
              {completedTasks.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Completed Tasks
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {completedTasks.map((task, index) => (
                      <div
                        key={index}
                        className={`bg-white p-5 border rounded-tl-xl rounded-br-xl transition-shadow duration-300 ${borderShadowStyles[task.status]} opacity-90`}
                      >
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[task.status]}`}
                        >
                          ✓ {task.status}
                        </span>
                        <h3 className="text-lg font-semibold mt-3 mb-2 text-gray-900">
                          {task.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{task.desc}</p>
                        <div className="text-xs text-gray-500">
                          Completed: {task.due}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Tasks Hidden */}
              {/* 
          {upcomingTasks.length > 0 && (
            <div>...render upcoming tasks...</div>
          )} 
          */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
