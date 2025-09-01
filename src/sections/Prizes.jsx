import React from "react";
import { motion } from "framer-motion";

const prizes = [
	{
		position: "1st",
		title: "3D VR HEADSET WITH IN-BUILT HEADPHONES",
		image: "/prizes/VrHeadset.webp",
		gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
		shadowColor: "#FFD700",
	},
	{
		position: "2nd",
		title: "IEM EARPHONES",
		image: "/prizes/Earphone.webp",
		gradient: "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)",
		shadowColor: "#C0C0C0",
	},
	{
		position: "3rd",
		title: "NOISE PULSE GO BUZZ SMARTWATCH",
		image: "/prizes/SmartWatch.webp",
		gradient: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)",
		shadowColor: "#CD7F32",
		
	},
	{
		position: "4th",
		title: "PORTABLE BLUETOOTH SPEAKER WITH IN-BUILT MIC",
		image: "/prizes/BluetoothSpeaker.webp",
		gradient: "linear-gradient(135deg, #4B3791 0%, #7152DE 100%)",
		shadowColor: "#7152DE",
	},
	{
		position: "5th",
		title: "COOL MIST QUITE AIR HUMIDIFIER",
		image: "/prizes/AirHumidifier.webp",
		gradient: "linear-gradient(135deg, #1C1538 0%, #4B3791 100%)",
		shadowColor: "#4B3791",
	},
	{
		position: "Top 25",
		title: "SELFIE STICK WITH TRIPOD STAND",
		image: "/prizes/Tripod.webp",
		gradient: "linear-gradient(135deg, #7152DE 0%, #1C1538 100%)",
		shadowColor: "#7152DE",
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
				className={`relative overflow-hidden rounded-2xl p-6 h-full flex flex-col justify-between transition-all duration-500 ${
					isTopThree ? "min-h-[350px]" : "min-h-[300px]"
				}`}
				style={{
					background: `${prize.gradient}`,
					boxShadow: `0 10px 30px ${prize.shadowColor}40, 0 0 0 1px ${prize.shadowColor}20`,
				}}
			>
				{/* Position badge */}
				<div className="absolute top-4 left-4 z-10">
					<div
						className={`px-3 py-1 rounded-full text-white font-bold backdrop-blur-sm ${
							isTopThree ? "text-base" : "text-sm"
						}`}
						style={{
							background: "rgba(255,255,255,0.2)",
							border: "1px solid rgba(255,255,255,0.3)",
							fontFamily: "Inter, system-ui, sans-serif",
						}}
					>
						{prize.position}
					</div>
				</div>

				{/* Prize image */}
				<div className="flex-1 flex items-center justify-center p-4">
					<div className="relative group-hover:scale-110 transition-transform duration-500">
						<img
							src={prize.image}
							alt={prize.title}
							className={`w-full h-auto object-contain filter drop-shadow-lg ${
								isTopThree ? "max-h-44" : "max-h-36"
							}`}
						/>
					</div>
				</div>

				{/* Prize title */}
				<div className="text-center z-10">
					<h3
						className={`text-white drop-shadow-lg ${
							isTopThree ? "text-lg md:text-xl" : "text-base"
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
			className="relative min-h-screen flex justify-center items-center py-20 px-4 overflow-hidden"
			style={{
				background: "#fff",
				position: "relative",
			}}
		>
			{/* Particle dots matching Rules theme */}
			{Array.from({ length: 15 }).map((_, i) => {
				const baseX = (((i * 7 + 10) % 100) / 100) * 100;
				const baseY = (((i * 11 + 15) % 100) / 100) * 100;
				const scale = 1 + (i % 3) * 0.2;
				const glowIntensity = 12 + (i % 5) * 8;
				return (
					<div
						key={i}
						className="absolute w-2 h-2 rounded-full animate-pulse"
						style={{
							left: `${baseX}%`,
							top: `${baseY}%`,
							animationDelay: `${i * 0.12}s`,
							transform: `scale(${scale})`,
							boxShadow: `0 0 ${glowIntensity}px #7152DE`,
							background: "#7152DE",
							filter: `blur(${(i % 4) * 0.4}px)`,
						}}
					/>
				);
			})}

			{/* Floating particles */}
			{Array.from({ length: 10 }).map((_, i) => {
				const baseTop = (((i * 13 + 20) % 90) / 100) * 100;
				const baseLeft = (((i * 17 + 25) % 90) / 100) * 100;
				const scale = 1 + (i % 4) * 0.15;
				const rotation = (i % 6) * 15;
				return (
					<div
						key={`floating-${i}`}
						className="absolute w-3 h-3 rounded-full animate-ping"
						style={{
							top: `${baseTop}%`,
							left: `${baseLeft}%`,
							animationDelay: `${i * 0.18}s`,
							animationDuration: `${2.5 + i * 0.15}s`,
							transform: `scale(${scale}) rotate(${rotation}deg)`,
							opacity: 0.5,
							background: "#4B3791",
							boxShadow: "0 0 20px #4B3791",
						}}
					/>
				);
			})}

			{/* Matrix lines */}
			<div className="absolute inset-0 opacity-5">
				{Array.from({ length: 20 }).map((_, i) => (
					<div
						key={i}
						className="absolute w-px bg-gradient-to-b from-transparent via-[#7152DE] to-transparent animate-pulse"
						style={{
							left: `${i * 5 + 2}%`,
							height: "100%",
							animationDuration: `${4 + i * 0.2}s`,
							animationDelay: `${i * 0.1}s`,
							opacity: 0.03,
						}}
					/>
				))}
			</div>

			<div className="relative w-full max-w-6xl mx-auto z-10">
				{/* Section header */}
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
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
						Prizes
					</h1>
					<p
						className="text-xl max-w-3xl mx-auto"
						style={{
							fontFamily: "JerseyM54, sans-serif",
							color: "#4B3791",
						}}
					>
						Compete for amazing rewards and climb your way to the top of the
						leaderboard
					</p>
				</motion.div>

				{/* Prize grid - Top row with 3 main prizes */}
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{prizes.slice(0, 3).map((prize, index) => (
							<PrizeCard key={index} prize={prize} index={index} />
						))}
					</div>

					{/* Bottom row with remaining prizes */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{prizes.slice(3).map((prize, index) => (
							<PrizeCard key={index + 3} prize={prize} index={index + 3} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Prizes;