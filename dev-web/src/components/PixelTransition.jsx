import { useState } from 'react'

export default function PixelTransition({
  children,
  pixelSize = 4,
  duration = 300,
  wrapperClassName = '',
  innerClassName = '',
  style = {},
  ...props
}) {
  const [isActive, setIsActive] = useState(false)

  const activeFilter = 'none'
  const inactiveFilter = `blur(${pixelSize}px)`

  const transitionStyle = `filter ${duration}ms ease-in-out`

  return (
    <div
      className={wrapperClassName}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{ position: 'relative', display: 'inline-block', ...style }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          filter: isActive ? activeFilter : inactiveFilter,
          transition: transitionStyle,
          imageRendering: 'pixelated',
        }}
      >
        {children}
      </div>
    </div>
  )
}
