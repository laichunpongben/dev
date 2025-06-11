import React from 'react'
import "./AnimatedBackground.css"

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
          <stop offset="0%" stopColor="#74c0fc">
            <animate
              attributeName="stop-color"
              values="#74c0fc;#ff9caa;#74c0fc"
              dur="8s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#ff9caa">
            <animate
              attributeName="stop-color"
              values="#ff9caa;#74c0fc;#ff9caa"
              dur="8s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#bgGrad)">
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          dur="2.5s"
          fill="freeze"
        />
      </rect>
    </svg>
  )
}
