import React from "react";
import { FaTasks, FaExclamationCircle, FaClock } from "react-icons/fa";

export default function Tasks() {
  const today = new Date();

  const tasks = {
    active: [
      {
        title: "Develop User",
        status: "Active",
        desc: "Implement user login, registration, and profile management system.",
        due: "2025-08-25",
      },
      {
        title: "Design",
        status: "Active",
        desc: "Create detailed UI mockups and style guidelines.",
        due: "2025-08-26",
      },
      {
        title: "Refactor",
        status: "Active",
        desc: "Optimize application modules and improve scalability.",
        due: "2025-08-27",
      },
      {
        title: "Conduct",
        status: "Active",
        desc: "Assess application performance and security.",
        due: "2025-08-28",
      },
      {
        title: "Implement",
        status: "Active",
        desc: "Integrate Google Analytics and monitor user activity.",
        due: "2025-08-29",
      },
      {
        title: "Review",
        status: "Active",
        desc: "Address review feedback and finalize documentation.",
        due: "2025-08-30",
      },
      {
        title: "Integrate",
        status: "Active",
        desc: "Connect app with payment processing APIs.",
        due: "2025-08-31",
      },
    ],
    upcoming: [
      {
        title: "Prepare Q3",
        status: "Upcoming",
        desc: "Develop comprehensive quarterly roadmap.",
        due: "2025-09-01",
      },
      {
        title: "Set Up CI/CD",
        status: "Upcoming",
        desc: "Configure automated build, test & deployment pipelines.",
        due: "2025-09-02",
      },
      {
        title: "Update Project",
        status: "Upcoming",
        desc: "Release updates and bug fixes.",
        due: "2025-09-03",
      },
      {
        title: "Plan Next",
        status: "Upcoming",
        desc: "Organize priorities for next development sprint.",
        due: "2025-09-04",
      },
    ],
  };

  const normalizeDate = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const todayNormalized = normalizeDate(today);

  const normalizeStatus = (task) => {
    const dueDate = normalizeDate(new Date(task.due));
    if (task.status === "Upcoming") return { ...task, status: "Upcoming" };
    return dueDate < todayNormalized
      ? { ...task, status: "Expired" }
      : { ...task, status: "Active" };
  };

  const allActive = tasks.active.map(normalizeStatus);
  const allUpcoming = tasks.upcoming.map(normalizeStatus);

  const totalTasks = allActive.length + allUpcoming.length;
  const progress = totalTasks ? Math.round((allActive.length / totalTasks) * 100) : 0;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const statusStyles = {
    Active: "bg-purple-100 text-purple-800",
    Upcoming: "bg-indigo-100 text-indigo-800",
    Expired: "bg-red-100 text-red-800",
  };

  const borderShadowStyles = {
    Active:
      "border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]",
    Upcoming:
      "border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]",
    Expired:
      "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]",
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* Center aligned title with gradient */}
      <h1
        className="text-3xl font-bold mb-12 text-center"
        style={{
          background: "linear-gradient(90deg, #1B1436, #4B3791)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Task
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Progress Circle */}
          <div className="bg-indigo-50 rounded-xl p-6 shadow-sm border border-indigo-200">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">Overall Progress</h2>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 relative mb-3">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r={radius} stroke="#f3f4f6" strokeWidth="8" fill="none" />
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
                  {progress}%
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Active & Expired: {allActive.length} / {totalTasks}
              </p>
            </div>
          </div>

          {/* Task Overview */}
          <div className="bg-purple-50 rounded-xl p-6 shadow-sm border border-purple-200">
            <h2 className="text-lg font-semibold mb-4 text-purple-700">Task Overview</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FaClock className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-indigo-700">Upcoming</p>
                  <p className="text-sm text-gray-500">{allUpcoming.length} tasks</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaTasks className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-purple-700">Active</p>
                  <p className="text-sm text-gray-500">
                    {allActive.filter((t) => t.status === "Active").length} tasks
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaExclamationCircle className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-red-700">Expired</p>
                  <p className="text-sm text-gray-500">
                    {allActive.filter((t) => t.status === "Expired").length} tasks
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active & Expired Tasks */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {allActive.map((task, index) => (
                <div
                  key={index}
                  className={`bg-white p-5 border rounded-tl-xl rounded-br-xl transition-shadow duration-300 ${borderShadowStyles[task.status]}`}
                >
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[task.status]}`}>
                    {task.status}
                  </span>
                  <h3 className="text-lg font-semibold mt-3 mb-2 text-gray-900">{task.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{task.desc}</p>
                  <div className="text-xs text-gray-500">Due: {task.due}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Upcoming Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {allUpcoming.map((task, index) => (
                <div
                  key={index}
                  className={`bg-white p-5 border rounded-tl-xl rounded-br-xl transition-shadow duration-300 ${borderShadowStyles[task.status]}`}
                >
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[task.status]}`}>
                    {task.status}
                  </span>
                  <h3 className="text-lg font-semibold mt-3 mb-2 text-gray-900">{task.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{task.desc}</p>
                  <div className="text-xs text-gray-500">Due: {task.due}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
