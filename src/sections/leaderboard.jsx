import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaStar, FaTrophy, FaAward, FaGem, FaShieldAlt, FaBolt, FaMedal, FaCrown, FaChevronRight } from 'react-icons/fa';

const LandingLeaderboard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for different participants
  const getParticipantIcon = (index) => {
    const icons = [FaUser, FaStar, FaTrophy, FaAward, FaGem, FaShieldAlt, FaBolt, FaMedal];
    return icons[index % icons.length];
  };

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

      setLeaderboardData(data.slice(0, 5)); // Only take top 5
      setError(null);
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError('Failed to load leaderboard data');
      
      // Fallback demo data with proper sorting - top 5 only
      const demoData = [
        { id: 1, name: 'Participant 1', points: 2450, rank: 1 },
        { id: 2, name: 'Participant 2', points: 2380, rank: 2 },
        { id: 3, name: 'Participant 3', points: 2100, rank: 3 },
        { id: 4, name: 'Participant 4', points: 1950, rank: 4 },
        { id: 5, name: 'Participant 5', points: 1800, rank: 5 }
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
      case 1: return <FaCrown className="text-yellow-400" />;
      case 2: return <FaTrophy className="text-gray-300" />;
      case 3: return <FaMedal className="text-orange-400" />;
      default: return null;
    }
  };

  const handleViewFullClick = () => {
    navigate('/leaderboard');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-violet-900/95 via-purple-800/95 to-indigo-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Glass border effect */}
        <div className="absolute inset-0 rounded-2xl border border-white/25 opacity-50"></div>
        
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-4">
            <FaTrophy className="animate-pulse text-3xl text-purple-300" />
            <div className="text-center">
              <span className="text-xl font-bold text-white">Loading Rankings...</span>
              <div className="mt-1 text-purple-200 text-sm">Fetching top performers</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90vw] lg:w-[70vw] m-auto mb-10 bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Glass border highlight effect */}
      <div className="absolute inset-0 rounded-2xl border border-white/25 opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      
      {/* Header */}
      <div className="bg-violet-900/80 backdrop-blur-sm rounded-t-2xl p-4 border-b border-white/20 relative z-10">
        <div className="flex">
          <div className='text-center flex-1'>
            <h3 
              className="text-xl sm:text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "Frontline, sans-serif" }}
            >
              🏆 Live Rankings
            </h3>
            <p className="text-purple-300 text-sm text-center leaderboard">Top 5 Performers</p>
          </div>
          {/* <Link 
            to="/leaderboard" 
            className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 transition-all duration-300 hover:scale-105"
          >
            
            <span className="text-white text-sm font-medium tracking-[1px] font-jersey">View Full</span>
            <FaChevronRight className="text-white text-xs group-hover:translate-x-1 transition-transform duration-300" />
          </Link> */}
          <div className="mt-2">
          <button 
            onClick={handleViewFullClick}
            className="group w-full bg-gradient-to-r from-purple-400/50 to-purple-400/50 hover:from-purple-500/70 hover:to-purple-500/70 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden block"
          >
            {/* Shining animation overlay */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-700 ease-out"></div>
            
            <div className="flex items-center justify-center space-x-1 relative z-10">
              <span className="text-white font-jersey tracking-[1px] font-semibold">View Full</span>
              <FaChevronRight className="text-white text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
        </div>
      </div>
      
      {/* Leaderboard List */}
      <div className="p-4 relative z-10">
        {leaderboardData.map((item, index) => {
          const IconComponent = getParticipantIcon(index);
          const maxPoints = Math.max(...leaderboardData.map(p => p.points));
          const progressWidth = (item.points / maxPoints) * 100;
          
          return (
            <div 
              key={item.id} 
              className="group bg-gradient-to-r from-purple-800 to-purple-700/90 hover:from-purple-700 hover:to-violet-400 backdrop-blur-sm border border-white/10 hover:border-white/30 p-3 mb-3 last:mb-0 rounded-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden cursor-pointer"
            >
              {/* Shining animation overlay */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-700 ease-out"></div>
              
              <div className="flex items-center relative z-10">
                {/* Rank */}
                <div className="flex items-center justify-center w-8 text-white font-bold text-lg mr-3">
                  {item.rank}
                </div>
                
                {/* Participant Icon */}
                <div className={`w-10 h-10 border-2 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm transition-all duration-300 mr-3 ${
                  item.rank === 1 ? 'bg-yellow-500/40 border-yellow-300/60 shadow-yellow-300/30' :
                  item.rank === 2 ? 'bg-slate-400/40 border-slate-200/60 shadow-slate-200/30' :
                  item.rank === 3 ? 'bg-orange-400/40 border-orange-300/60 shadow-orange-300/30' :
                  'bg-purple-600/40 border-purple-300/60 group-hover:bg-purple-300/60'
                } shadow-lg`}>
                  <IconComponent className={`text-sm transition-colors duration-300 ${
                    item.rank <= 3 ? 'text-white' : 'text-purple-100 group-hover:text-white'
                  }`} />
                </div>
                
                {/* Name and Points */}
                <div className="flex-1 min-w-0 mr-3">
                  <h4 className="text-white group-hover:text-white font-jersey tracking-[2px] font-semibold text-base group-hover:font-bold capitalize truncate transition-all duration-300">
                    {item.name}
                  </h4>
                  {/* Progress Bar */}
                  <div className="mt-1 relative">
                    <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
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
                
                {/* Points */}
                <div className="text-right mr-2">
                  <div className="text-white group-hover:text-white font-jersey tracking-[1px] font-bold text-lg transition-colors duration-300">
                    {item.points.toLocaleString()}
                  </div>
                  <div className="text-purple-200 font-bold leaderboard group-hover:text-white text-xs transition-colors duration-300">
                    points
                  </div>
                </div>
                
                {/* Rank Icon */}
                <div className="w-6 flex justify-center">
                  {getRankIcon(item.rank)}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* View All Button */}
        {/* <div className="mt-4 pt-4 border-t border-white/20">
          <Link 
            to="/leaderboard"
            className="group w-full bg-gradient-to-r from-purple-600/50 to-violet-800/50 hover:from-purple-500/70 hover:to-indigo-500/70 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-4 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden block"
          > */}
            {/* Shining animation overlay */}
            {/* <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-700 ease-out"></div>
            
            <div className="flex items-center justify-center space-x-2 relative z-10">
              <span className="text-white font-jersey tracking-[1px] font-semibold">View Full Leaderboard</span>
              <FaChevronRight className="text-white text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </div> */}
        
        {/* Status */}
        <div className="mt-4 text-center">
          <div className="inline-block bg-purple-800/60 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
            <p className="text-purple-200 text-xs">
              Live Updates • {leaderboardData.length} of {leaderboardData.length > 0 ? '100+' : '0'} Participants
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-4 pb-4">
          <div className="bg-red-600/80 backdrop-blur-xl border border-red-400/40 rounded-xl p-3 text-red-100 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-red-300">⚠️</span>
              <span>Using demo data - {error}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingLeaderboard;