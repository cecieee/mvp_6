import React from "react";
import { FaTasks, FaExclamationCircle, FaClock } from "react-icons/fa";

export default function Tasks() {
  const today = new Date();

  const tasks = {
    active: [
      {
        title: "Develop User",
        status: "Upcoming",
        desc: "Implement user login, registration, and profile management system.",
        due: "2025-09-10",
      },
      {
        title: "Design",
        status: "Upcoming",
        desc: "Create detailed UI mockups and style guidelines.",
        due: "2025-09-11",
      },
      {
        title: "Refactor",
        status: "Upcoming",
        desc: "Optimize application modules and improve scalability.",
        due: "2025-09-12",
      },
      {
        title: "Conduct",
        status: "Upcoming",
        desc: "Assess application performance and security.",
        due: "2025-09-13",
      },
      {
        title: "Implement",
        status: "Upcoming",
        desc: "Integrate Google Analytics and monitor user activity.",
        due: "2025-09-14",
      },
      {
        title: "Review",
        status: "Upcoming",
        desc: "Address review feedback and finalize documentation.",
        due: "2025-09-15",
      },
      {
        title: "Integrate",
        status: "Upcoming",
        desc: "Connect app with payment processing APIs.",
        due: "2025-09-16",
      },
    ],
    upcoming: [
      {
        title: "Prepare Q3",
        status: "Upcoming",
        desc: "Develop comprehensive quarterly roadmap.",
        due: "2025-09-17",
      },
      {
        title: "Set Up CI/CD",
        status: "Upcoming",
        desc: "Configure automated build, test & deployment pipelines.",
        due: "2025-09-18",
      },
      {
        title: "Update Project",
        status: "Upcoming",
        desc: "Release updates and bug fixes.",
        due: "2025-09-19",
      },
      {
        title: "Plan Next",
        status: "Upcoming",
        desc: "Organize priorities for next development sprint.",
        due: "2025-09-20",
      },
    ],
  };

  const normalizeDate = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const todayNormalized = normalizeDate(today);

  const normalizeStatus = (task) => {
    const dueDate = normalizeDate(new Date(task.due));
    
    // If task is originally upcoming, keep it upcoming
    if (task.status === "Upcoming") return { ...task, status: "Upcoming" };
    
    // For active tasks, check if they're expired
    if (dueDate < todayNormalized) {
      return { ...task, status: "Expired" };
    }
    
    return { ...task, status: "Active" };
  };

  const allActive = tasks.active.map(normalizeStatus);
  const allUpcoming = tasks.upcoming.map(normalizeStatus);

  // Separate tasks by their actual status from both arrays
  const allTasks = [...allActive, ...allUpcoming];
  const activeTasks = allTasks.filter((t) => t.status === "Active");
  const upcomingTasks = allTasks.filter((t) => t.status === "Upcoming");
  const expiredTasks = allTasks.filter((t) => t.status === "Expired");

  const totalTasks = allTasks.length;
  const completedTasks = activeTasks.length + expiredTasks.length; // Tasks that have been worked on
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

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
        
        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#7152DE] to-[#4B3791] mx-auto rounded-full mb-8"></div>
      </div>

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
                Completed: {completedTasks} / {totalTasks}
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
                  <p className="text-sm text-gray-500">{upcomingTasks.length} tasks</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaTasks className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-purple-700">Active</p>
                  <p className="text-sm text-gray-500">{activeTasks.length} tasks</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaExclamationCircle className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-red-700">Expired</p>
                  <p className="text-sm text-gray-500">{expiredTasks.length} tasks</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Tasks */}
          {activeTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Active Tasks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {activeTasks.map((task, index) => (
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
          )}

          {/* Upcoming Tasks */}
          {upcomingTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Upcoming Tasks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {upcomingTasks.map((task, index) => (
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
          )}

          {/* Expired Tasks */}
          {expiredTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Expired Tasks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {expiredTasks.map((task, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
}
