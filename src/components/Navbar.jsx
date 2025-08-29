import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you want to import the Leaderboard component


export default function Navbar() {
  return (
    <div>
      <div className="flex justify-center gap-2">
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </div>
  )
}
