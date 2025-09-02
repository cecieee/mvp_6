import React from "react";
import RulesCard from "../components/RulesCard";
import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaClipboardList, FaTrophy } from "react-icons/fa";

const rules = [
	{
		title: "IEEE Membership",
		content:
			"To enroll in the volunteering program, the student must have a valid IEEE membership ID. This ensures access to exclusive IEEE resources and networking opportunities.",
		icon: <FaUsers className="text-2xl text-[#7152DE]" />,
	},
	{
		title: "Task Schedule",
		content:
			"Online tasks will be provided to the volunteers on alternate days. Each task is carefully designed to enhance your technical skills and contribute to meaningful projects.",
		icon: <FaCalendarAlt className="text-2xl text-[#7152DE]" />,
	},
	{
		title: "Task Submission",
		content:
			"Reports of the completed task should be submitted via the Google Form that will be provided along with each task. Detailed documentation is encouraged for better evaluation.",
		icon: <FaClipboardList className="text-2xl text-[#7152DE]" />,
	},
	{
		title: "Rewards",
		content:
			"The successful completion of each task will reward you with points. Accumulate points to climb the leaderboard and unlock exclusive prizes and recognition.",
		icon: <FaTrophy className="text-2xl text-[#7152DE]" />,
	},
];

function Rules() {
	return (
		<section
			id="rules"
			className="relative min-h-screen flex justify-center items-center py-20 px-4 overflow-hidden"
			style={{
				background: "#fff",
				position: "relative",
			}}
		>
			<div className="relative w-full max-w-6xl mx-auto z-10">
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h1
						className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
						style={{
							fontFamily: "Frontline, sans-serif",
							background: "linear-gradient(90deg, #1C1538 0%, #4B3791 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							color: "#1C1538",
						}}
					>
						Rules
					</h1>
					<p
						className="text-xl max-w-2xl mx-auto"
						style={{
							fontFamily: "JerseyM54, sans-serif",
							color: "#4B3791",
						}}
					>
						Follow these guidelines to ensure a fair and rewarding experience
						for all participants
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{rules.map((rule, index) => (
						<RulesCard key={index} title={rule.title} index={index}>
							<div className="flex items-start space-x-3">
								<div className="mt-1">{rule.icon}</div>
								<span>{rule.content}</span>
							</div>
						</RulesCard>
					))}
				</div>
			</div>
		</section>
	);
}

export default Rules;