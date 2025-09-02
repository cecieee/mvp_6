import React from "react";
import { motion } from "framer-motion";

const prizes = [
	{
		position: "1st",
		title: "VR HEADSET",
		image: "/prizes/VrHeadset.webp",
		gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
		shadowColor: "#FFD700",
	},
	{
		position: "2nd",
		title: "SMART WATCH",
		image: "/prizes/SmartWatch.webp",
		gradient: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)",
		shadowColor: "#CD7F32",
		
	},
	{
		position: "3rd",
		title: "IEM EARPHONES",
		image: "/prizes/Earphone.webp",
		gradient: "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)",
		shadowColor: "#C0C0C0",
	},
	{
		position: "4th",
		title: "BLUETOOTH SPEAKER",
		image: "/prizes/BluetoothSpeaker.webp",
		gradient: "linear-gradient(135deg, #4B3791 0%, #7152DE 100%)",
		shadowColor: "#7152DE",
	},
	{
		position: "5th",
		title: "OUTDOOR TELESCOPE",
		image: "/prizes/OutdoorTelescope.webp",
		gradient: "linear-gradient(135deg, #1C1538 0%, #4B3791 100%)",
		shadowColor: "#4B3791",
	},
];

const PrizeCard = ({ prize, index }) => {
	const isTopThree = index < 3;

	const cardVariants = {
		hidden: { opacity: 0, y: 50, scale: 0.9 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				delay: index * 0.1,
				ease: "easeOut",
			},
		},
	};

	return (
		<motion.div
			variants={cardVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px" }}
			whileHover={{
				scale: 1.05,
				y: -10,
				transition: { duration: 0.3 },
			}}
			className="relative group"
			style={{ cursor: 'default' }}
		>
			<div
				className={`relative overflow-hidden rounded-2xl p-4 h-full flex flex-col justify-between transition-all duration-500 ${
					isTopThree ? "min-h-[280px]" : "min-h-[260px]"
				}`}
				style={{
					background: `${prize.gradient}`,
					boxShadow: `0 10px 30px ${prize.shadowColor}40, 0 0 0 1px ${prize.shadowColor}20`,
				}}
			>
				{/* Position badge */}
				<div className="absolute top-3 left-3 z-10">
					<div
						className={`px-2.5 py-1 rounded-full text-white backdrop-blur-sm ${
							isTopThree ? "text-sm" : "text-xs"
						}`}
						style={{
							background: "rgba(255,255,255,0.2)",
							border: "1px solid rgba(255,255,255,0.3)",
							fontFamily: "JerseyM54, sans-serif",
						}}
					>
						{prize.position}
					</div>
				</div>

				{/* Prize image */}
				<div className="flex-1 flex items-center justify-center p-3">
					<div className="relative group-hover:scale-110 transition-transform duration-500">
						<img
							src={prize.image}
							alt={prize.title}
							className={`w-full h-auto object-contain filter drop-shadow-lg ${
								isTopThree 
									? "max-h-40" 
									: prize.title.includes("TELESCOPE") 
										? "max-h-40" 
										: "max-h-36"
							}`}
						/>
					</div>
				</div>

				{/* Prize title */}
				<div className="text-center z-10">
					<h3
						className={`text-white drop-shadow-lg ${
							isTopThree ? "text-base md:text-lg" : "text-sm md:text-base"
						}`}
						style={{
							fontFamily: "JerseyM54, sans-serif",
							textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
						}}
					>
						{prize.title}
					</h3>
				</div>

				{/* Shine effect */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
					<div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"
						style={{ width: "50%" }}
					/>
				</div>
			</div>
		</motion.div>
	);
};

function Prizes() {
	return (
		<section
			id="prizes"
			className="relative py-16 px-4 overflow-hidden"
			style={{
				background: "#fff",
				position: "relative",
			}}
		>
			<div className="relative w-full max-w-6xl mx-auto z-10">
				{/* Section header */}
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-12"
				>
					<h1
						className="text-4xl md:text-5xl lg:text-6xl mb-3"
						style={{
							fontFamily: "Frontline, sans-serif",
							background: "linear-gradient(90deg, #1C1538 0%, #4B3791 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							color: "#1C1538",
						}}
					>
						Prizes
					</h1>
					<p
						className="text-lg max-w-3xl mx-auto"
						style={{
							fontFamily: "JerseyM54, sans-serif",
							color: "#4B3791",
						}}
					>
						Compete for amazing rewards and climb your way to the top of the
						leaderboard
					</p>
				</motion.div>

				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{prizes.slice(0, 3).map((prize, index) => (
							<PrizeCard key={index} prize={prize} index={index} />
						))}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
						{prizes.slice(3).map((prize, index) => (
							<PrizeCard key={index + 3} prize={prize} index={index + 3} />
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-center mt-12 py-8"
					>
						<div className="mb-2">
							<h3
								className="text-3xl md:text-4xl font-bold mb-3"
								style={{
									fontFamily: "JerseyM54, sans-serif",
									color: "#7152DE",
								}}
							>
								Top 25 Participants
							</h3>
							<p
								className="text-xl text-purple-600 font-medium mb-2"
								style={{
									fontFamily: "JerseyM54, sans-serif",
								}}
							>
								Exciting Prizes For Top 25 Participants
							</p>
						</div>

						<div
							className="inline-flex items-center gap-3 text-base font-medium text-purple-600"
							style={{
									fontFamily: "JerseyM54, sans-serif",

							}}
						>
							<span>Certificates for ALL Participants</span>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default Prizes;