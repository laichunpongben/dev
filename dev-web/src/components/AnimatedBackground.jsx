import React from 'react'
import './AnimatedBackground.css'

export default function AnimatedBackground({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#74c0fc" />
          <stop offset="100%" stopColor="#ff9caa" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#bgGrad)" />
      <g id="scientist" transform="translate(-30 140)">
        <circle cx="0" cy="-26" r="6" fill="#ffe0bd" stroke="#000" strokeWidth="1" />
        <rect x="-8" y="-20" width="16" height="20" fill="#fff" stroke="#000" strokeWidth="1" />
        <line x1="-8" y1="-12" x2="-18" y2="-8" stroke="#000" strokeWidth="2">
          <animate attributeName="y2" values="-8;-12;-8" dur="0.4s" repeatCount="indefinite" />
        </line>
        <line x1="8" y1="-12" x2="18" y2="-8" stroke="#000" strokeWidth="2">
          <animate attributeName="y2" values="-8;-12;-8" begin="0.2s" dur="0.4s" repeatCount="indefinite" />
        </line>
        <line x1="-4" y1="0" x2="-4" y2="10" stroke="#000" strokeWidth="2">
          <animate attributeName="x2" values="-4;-8;-4" dur="0.4s" repeatCount="indefinite" />
        </line>
        <line x1="4" y1="0" x2="4" y2="10" stroke="#000" strokeWidth="2">
          <animate attributeName="x2" values="4;8;4" begin="0.2s" dur="0.4s" repeatCount="indefinite" />
        </line>
        <animateTransform
          attributeName="transform"
          type="translate"
          from="-30 140"
          to="230 140"
          dur="4s"
          begin="0s"
          fill="freeze"
        />
        <animate attributeName="opacity" values="1;0" begin="3.6s" dur="0.4s" fill="freeze" />
      </g>
    </svg>
  )
}
