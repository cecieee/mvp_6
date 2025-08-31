import React, { useState, useEffect } from 'react';
import { FaUser, FaStar, FaTrophy, FaMedal, FaCrown, FaAward, FaGem, FaShieldAlt, FaBolt } from 'react-icons/fa';

const EventLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  // Icon mapping for different participants
  const getParticipantIcon = (index) => {
    const icons = [FaUser, FaStar, FaTrophy, FaAward, FaGem, FaShieldAlt, FaBolt, FaMedal];
    return icons[index % icons.length];
  };

  // Handle touch effects - only for mobile devices
  const handleCardClick = (id) => {
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice && id.startsWith('top3-')) {
      // For top 3 cards on touch devices, show effect briefly then reset
      setActiveCard(id);
      setTimeout(() => setActiveCard(null), 600);
    } else if (!id.startsWith('top3-')) {
      // For other cards, keep toggle behavior
      setActiveCard(activeCard === id ? null : id);
    }
  };

  // Loading animation component for leaderboard list
  const LoadingLeaderboard = () => (
    <div className="mx-4 sm:mx-auto sm:w-[90vw] lg:w-[60vw] font-jersey bg-gradient-to-b from-violet-900 to-violet-600 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl relative overflow-hidden mb-6">
      {/* Glass border effect */}
      <div className="absolute inset-0 rounded-2xl border border-white/25 opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      
      {/* Header */}
      <div className="bg-violet-900 backdrop-blur-sm rounded-t-2xl p-3 sm:p-4 border-b border-white/20">
        <div className="flex items-center text-slate-100 font-semibold text-xs sm:text-sm uppercase tracking-wide">
          <div className="w-6 sm:w-8 text-center">Rank</div>
          <div className="w-8 sm:w-12 ml-2 sm:ml-4"></div>
          <div className="flex-1 ml-2 sm:ml-4">Name</div>
          <div className="text-right w-16 sm:w-24">Points</div>
          <div className="w-4 sm:w-6 ml-1 sm:ml-2"></div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="p-6 sm:p-8 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Animated Trophy */}
          <div className="relative">
            <FaTrophy className="text-4xl sm:text-5xl text-yellow-300 animate-pulse" />
            <div className="absolute inset-0 animate-ping">
              <FaTrophy className="text-4xl sm:text-5xl text-yellow-300 opacity-30" />
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Loading Rankings...
            </h3>
            <p className="text-purple-200 text-sm sm:text-base">
              Fetching the latest leaderboard data
            </p>
          </div>

          {/* Animated Progress Bars */}
          <div className="w-full max-w-md space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-300 to-indigo-400 rounded-full animate-pulse"
                    style={{ 
                      width: `${60 + (i * 8)}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '1.5s'
                    }}
                  ></div>
                </div>
                <div className="w-12 h-3 bg-white/20 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              </div>
            ))}
          </div>

          {/* Floating Dots Animation */}
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Fetch data from Google Sheets
  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQdGYvZIoH2axeJPQXrDqRjSWtYtIH1WpMTNla-lOiOvQ3oTukwD88BQBSTVdStxeSvAPBwTBGE5DOc/pub?output=csv');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const csvText = await response.text();
      
      // Parse CSV data
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      const data = lines.slice(1)
        .filter(line => line.trim())
        .map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const row = {};
          headers.forEach((header, i) => {
            row[header] = values[i] || '';
          });
          
          // Map common column names to standard format
          return {
            id: index + 1,
            name: row.Name || row.name || row.Participant || row.participant || `Participant ${index + 1}`,
            points: parseInt(row.Points || row.points || row.Score || row.score || 0) || 0,
            originalRank: parseInt(row.Rank || row.rank || 0) || 0,
            ...row
          };
        })
        .sort((a, b) => {
          // Sort by points in descending order (highest first)
          if (b.points !== a.points) {
            return b.points - a.points;
          }
          // If points are equal, maintain original order
          return a.id - b.id;
        })
        .map((item, index) => ({
          ...item,
          rank: index + 1 // Assign new rank based on sorted position
        }));

      setLeaderboardData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError('Failed to load leaderboard data');
      
      // Fallback demo data with proper sorting
      const demoData = [
        { id: 1, name: 'Participant 1', points: 2450, rank: 1 },
        { id: 2, name: 'Participant 2', points: 2380, rank: 2 },
        { id: 3, name: 'Participant 3', points: 2100, rank: 3 },
        { id: 4, name: 'Participant 4', points: 1950, rank: 4 },
        { id: 5, name: 'Participant 5', points: 1800, rank: 5 },
        { id: 6, name: 'Participant 6', points: 1750, rank: 6 },
        { id: 7, name: 'Participant 7', points: 1650, rank: 7 },
        { id: 8, name: 'Participant 8', points: 1550, rank: 8 }
      ];
      setLeaderboardData(demoData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <FaCrown className="text-yellow-200" />;
      case 2: return <FaTrophy className="text-gray-100" />;
      case 3: return <FaMedal className="text-orange-200" />;
      default: return null;
    }
  };

  const getTopThreeCard = (item, position) => {
    const cardStyles = {
      1: {
        bg: 'bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400',
        border: 'border-yellow-300/40',
        glow: 'shadow-yellow-300/30',
        text: 'text-yellow-50',
        subtext: 'text-yellow-100',
        height: 'h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80',
        marginTop: 'mt-0',
        iconBg: 'bg-yellow-200/40',
        hover: 'hover:bg-gradient-to-br hover:from-yellow-300 hover:via-amber-300 hover:to-orange-300 hover:shadow-yellow-900/40 active:bg-gradient-to-br active:from-yellow-300 active:via-amber-300 active:to-orange-300'
      },
      2: {
        bg: 'bg-gradient-to-br from-slate-400 via-gray-400 to-gray-500',
        border: 'border-slate-200/40',
        glow: 'shadow-slate-300/30',
        text: 'text-slate-50',
        subtext: 'text-slate-100',
        height: 'h-44 sm:h-52 md:h-60 lg:h-64 xl:h-72',
        marginTop: 'mt-2 sm:mt-4 md:mt-6 lg:mt-8',
        iconBg: 'bg-slate-200/40',
        hover: 'hover:bg-gradient-to-br hover:from-slate-400 hover:via-gray-400 hover:to-gray-400 hover:shadow-slate-200/40 active:bg-gradient-to-br active:from-slate-300 active:via-gray-200 active:to-blue-300'
      },
      3: {
        bg: 'bg-gradient-to-br from-orange-500 via-amber-500 to-red-400',
        border: 'border-orange-300/40',
        glow: 'shadow-orange-300/30',
        text: 'text-orange-50',
        subtext: 'text-orange-100',
        height: 'h-40 sm:h-48 md:h-52 lg:h-60 xl:h-64',
        marginTop: 'mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16',
        iconBg: 'bg-orange-200/40',
        hover: 'hover:bg-gradient-to-br hover:from-orange-400 hover:via-amber-400 hover:to-red-300 hover:shadow-orange-200/40 active:bg-gradient-to-br active:from-orange-400 active:via-amber-400 active:to-red-300'
      }
    };

    const style = cardStyles[item.rank];
    const IconComponent = getParticipantIcon(item.id - 1);
    const isActive = activeCard === `top3-${item.id}`;

    return (
      <div 
        key={item.id} 
        className={`group ${style.bg} ${style.hover} ${style.border} ${style.glow} ${style.height} ${style.marginTop} rounded-xl sm:rounded-2xl backdrop-blur-xl border p-2 sm:p-3 md:p-4 lg:p-6 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 w-full max-w-[110px] sm:max-w-[140px] md:max-w-xs lg:max-w-sm xl:max-w-none xl:w-[20vw] flex flex-col justify-between relative overflow-hidden ${isActive ? 'shadow-3xl bg-opacity-60 scale-105' : ''}`}
        style={{
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
        onClick={() => handleCardClick(`top3-${item.id}`)}
      >
        {/* Full glass border highlight effect */}
        <div className="absolute inset-0 rounded-2xl border border-white/30 opacity-70"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/35 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/35 to-transparent"></div>
        
        {/* Shining animation overlay for cards */}
        <div className={`absolute inset-0 -translate-x-full ${isActive ? 'translate-x-full' : 'group-hover:translate-x-full'} bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 rounded-xl sm:rounded-2xl transition-none group-hover:transition-transform group-hover:duration-1000 group-hover:ease-out ${isActive ? 'transition-transform duration-1000 ease-out' : ''}`}></div>
        
        {/* Rank Badge */}
        <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-4">
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {getRankIcon(item.rank)}
          </div>
        </div>

        {/* Participant Avatar */}
        <div className="flex justify-center mb-1 sm:mb-2 md:mb-4">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 border-2 border-white/40 ${style.iconBg} rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg`}>
            <IconComponent className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${style.text}`} />
          </div>
        </div>
        
        {/* Name */}
        <div className="text-center mb-1 sm:mb-2 md:mb-4">
          <h3 className={`${style.text} font-bold text-xs sm:text-sm md:text-base lg:text-lg leading-tight px-1`}>
            {item.name}
          </h3>
        </div>
        
        {/* Points */}
        <div className="text-center">
          <div className={`${style.text} text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold`}>{item.points}</div>
          <div className={`${style.subtext} text-xs sm:text-xs md:text-sm font-medium`}>points</div>
        </div>
      </div>
    );
  };

  // Get top 3 for card display - arranged with 1st in middle (2nd, 1st, 3rd)
  const topThree = leaderboardData.slice(0, 3);
  const cardOrder = topThree.length >= 3 ? [topThree[1], topThree[0], topThree[2]] : 
                   topThree.length >= 2 ? [topThree[1], topThree[0]] :
                   topThree.length >= 1 ? [topThree[0]] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="relative z-10">
         {/* Header */}
        <div className="text-center pt-25 pb-6 px-4">
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-frontline mb-5 break-words"
            style={{
              fontFamily: "Frontline, sans-serif",
              background: "linear-gradient(90deg, #1C1538 0%, #7152DE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            LEADERBOARD
          </h1>
        </div>

        {/* Subtitle section */}
        <div className="text-center mb-12 px-4">  
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#7152DE] to-[#4B3791] mx-auto rounded-full mt-8 opacity-60 mb-5"></div>
          <div className="max-w-4xl mx-auto space-y-6">
            <p 
              className="text-lg sm:text-xl md:text-2xl italic font-medium text-[#1C1538]"
              style={{ fontFamily: "serif" }}
            >
              "The difference between ordinary and extraordinary is that little extra."  <br />- Jimmy Johnson
            </p>
            <p 
              className="text-sm sm:text-base md:text-lg text-[#4B3791]"
              style={{ fontFamily: "JerseyM54, sans-serif" }}
            >
              Real-time recognition of those who refuse to settle for average. Every position earned, every point a stepping stone to greatness.
            </p>
          </div>
          
          {/* Bottom decorative line */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#7152DE] to-[#4B3791] mx-auto rounded-full mt-8 opacity-60"></div>
        </div>

        {/* Top 3 Cards Section */}
        {!loading && cardOrder.length > 0 && (
          <div className="px-2 sm:px-4 py-4 sm:py-6 overflow-hidden font-jersey">
            <h2 
              className="text-center text-[#4B3791] font-bold mb-8 text-xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "Frontline, sans-serif" }}
            >
              🏆 Top Performers
            </h2>
            <div className="flex justify-center items-end gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[360px] px-4">
              {cardOrder.map((item) => getTopThreeCard(item))}
            </div>
          </div>
        )}

        {/* Full Leaderboard List */}
        {loading ? (
          <LoadingLeaderboard />
        ) : (
          <div className="mx-4 sm:mx-auto sm:w-[90vw] lg:w-[60vw] font-jersey bg-gradient-to-b from-violet-900 to-violet-600 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl relative overflow-hidden mb-6">
            {/* Full glass border highlight effect */}
            <div className="absolute inset-0 rounded-2xl border border-white/25 opacity-50"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"></div>
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            
            {/* Column Headers */}
            <div className="bg-violet-900 backdrop-blur-sm rounded-t-2xl leaderboard p-3 sm:p-4 border-b border-white/20">
              <div className="flex items-center text-slate-100 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                <div className="w-6 sm:w-8 text-center">Rank</div>
                <div className="w-8 sm:w-12 ml-2 sm:ml-4"></div> {/* Space for icon */}
                <div className="flex-1 ml-2 sm:ml-4">Name</div>
                <div className="text-right w-16 sm:w-24">Points</div>
                <div className="w-4 sm:w-6 ml-1 sm:ml-2"></div> {/* Space for trophy icon */}
              </div>
            </div>
            
            {leaderboardData.map((item, index) => {
              const IconComponent = getParticipantIcon(index);
              const maxPoints = Math.max(...leaderboardData.map(p => p.points));
              const progressWidth = (item.points / maxPoints) * 100;
              const isRowActive = activeCard === `row-${item.id}`;
              
              return (
                <div 
                  key={item.id} 
                  className={`group bg-gradient-to-l from-violet-400 to-purple-800 backdrop-blur-sm border border-white/10 p-3 sm:p-4 hover:bg-violet-600 hover:border-slate-400/70 active:bg-violet-200 active:border-violet-400 transition-all duration-300 hover:scale-[1.01] active:scale-[1.01] relative overflow-hidden ${isRowActive ? 'bg-slate-400/20 border-slate-300/90 scale-[1.01]' : ''}`}
                  onClick={() => handleCardClick(`row-${item.id}`)}
                  style={{ cursor: 'default' }}
                >
                  {/* Full glass border highlight effect on hover */}
                  <div className={`absolute inset-0 border border-transparent ${isRowActive ? 'border-white/30' : 'group-hover:border-white/30'} rounded transition-all duration-300`}></div>
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 ${isRowActive ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}></div>
                  <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 ${isRowActive ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}></div>
                  <div className={`absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent opacity-0 ${isRowActive ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}></div>
                  <div className={`absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent opacity-0 ${isRowActive ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}></div>
                  
                  {/* Shining animation overlay - on individual row hover/touch */}
                  <div className={`absolute inset-0 -translate-x-full ${isRowActive ? 'translate-x-full' : 'group-hover:translate-x-full'} bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 transition-none group-hover:transition-transform group-hover:duration-700 group-hover:ease-out ${isRowActive ? 'transition-transform duration-700 ease-out' : ''}`}></div>

                  <div className="flex items-center relative z-10">
                    {/* Rank Number */}
                    <div className={`flex items-center justify-center w-6 sm:w-8 text-slate-100 font-bold text-sm sm:text-lg ${isRowActive ? 'text-white' : 'group-hover:text-white'} transition-colors`}>
                      {item.rank}
                    </div>
                    
                    {/* Participant Icon */}
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/30 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm transition-all duration-300 ml-2 sm:ml-4 ${
                      item.rank === 1 ? 'bg-yellow-500/40 border-yellow-300/60 shadow-yellow-300/30' :
                      item.rank === 2 ? 'bg-slate-400/40 border-slate-200/60 shadow-slate-200/30' :
                      item.rank === 3 ? 'bg-orange-400/40 border-orange-300/60 shadow-orange-300/30' :
                      `bg-purple-600/30 border-slate-300/40 ${isRowActive ? 'bg-purple-300/40' : 'group-hover:bg-purple-300/40'}`
                    } shadow-lg`}>
                      <IconComponent className={`text-sm sm:text-lg transition-colors duration-300 ${
                        item.rank <= 3 ? 'text-white' : `text-slate-100 ${isRowActive ? 'text-white' : 'group-hover:text-white'}`
                      }`} />
                    </div>
                    
                    {/* Name Container */}
                    <div className="flex-1 min-w-0 ml-2 sm:ml-4">
                      <h3 className={`text-purple-200 ${isRowActive ? 'text-white font-bold' : 'group-hover:text-white group-hover:font-bold'} text-sm sm:text-lg capitalize truncate transition-all duration-300`}>
                        {item.name}
                      </h3>
                    </div>
                    
                    {/* Points */}
                    <div className="text-right w-16 sm:w-24">
                      <div className={`text-purple-200 ${isRowActive ? 'text-white' : 'group-hover:text-white'} font-bold text-sm sm:text-xl transition-colors tracking-[2px] duration-300`}>
                        {item.points.toLocaleString()}
                      </div>
                      <div className={`text-white ${isRowActive ? 'text-white' : 'group-hover:text-white'} text-xs transition-colors duration-300`}>
                        points
                      </div>
                    </div>
                    
                    {/* Rank Icon for top positions */}
                    <div className="w-4 sm:w-6 flex justify-center ml-1 sm:ml-2">
                      {getRankIcon(item.rank)}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2 ml-8 sm:ml-12 mr-6 sm:mr-8 relative z-10">
                    <div className="w-3/4 bg-white/20 rounded-full h-1 sm:h-1.5 overflow-hidden backdrop-blur-sm">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          item.rank === 1 ? 'bg-gradient-to-r from-yellow-300 to-yellow-500' :
                          item.rank === 2 ? 'bg-gradient-to-r from-slate-300 to-slate-500' :
                          item.rank === 3 ? 'bg-gradient-to-r from-orange-300 to-orange-500' :
                          'bg-gradient-to-r from-purple-300 to-indigo-400'
                        }`}
                        style={{ width: `${progressWidth}%` }}
                      >
                        <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="px-4 py-2 mt-4">
            <div className="bg-gradient-to-r from-red-600/80 via-red-700/90 to-red-600/80 backdrop-blur-xl border border-red-400/40 rounded-xl p-4 text-red-100 text-xs sm:text-sm shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="text-red-300">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* Status indicator */}
        <div className="px-4 py-4 sm:py-6 text-center">
          <div className="inline-block bg-purple-700/90 backdrop-blur-xl border border-white/20 rounded-full px-3 sm:px-4 py-2 shadow-lg">
            <p className="text-slate-200 font-semibold text-xs">
              Total Participants: {leaderboardData.length} • Updated by Points
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLeaderboard;