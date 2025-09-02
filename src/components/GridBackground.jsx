import React from 'react';

export default function GridBackground({ 
  opacity = 0.5, 
  gridSize = 64, 
  lineWidth = 1.5,
  color = "rgba(0,0,0,0.08)",
  className = "",
  zIndex = 0 
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            to right,
            ${color} 0px,
            ${color} ${lineWidth}px,
            transparent ${lineWidth}px,
            transparent ${gridSize}px
          ),
          repeating-linear-gradient(
            to bottom,
            ${color} 0px,
            ${color} ${lineWidth}px,
            transparent ${lineWidth}px,
            transparent ${gridSize}px
          )
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        opacity,
        zIndex,
      }}
    />
  );
}
