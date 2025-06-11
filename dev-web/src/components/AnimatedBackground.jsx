import React from 'react'
import './AnimatedBackground.css'
import bunny from '../assets/images/usagi_running_colored.svg'

export default function AnimatedBackground({ className = '' }) {
  return (
    <div className={className}>
      <img src={bunny} alt="Running bunny" className="running-bunny" />
    </div>
  )
}
