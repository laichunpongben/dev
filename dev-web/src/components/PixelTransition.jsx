import { useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import './PixelTransition.css'

export default function PixelTransition({
  firstContent,
  secondContent,
  children,
  gridSize = 7,
  pixelColor = 'currentColor',
  animationStepDuration = 0.3,
  className = '',
  style = {},
  aspectRatio = '100%',
}) {
  // allow backwards compatibility using children as firstContent
  const initialContent = firstContent || children
  const secondaryContent = secondContent || initialContent

  const containerRef = useRef(null)
  const pixelGridRef = useRef(null)
  const activeRef = useRef(null)
  const delayedCallRef = useRef(null)

  const [isActive, setIsActive] = useState(false)

  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches

  const pixels = useMemo(() => {
    const elements = []
    const size = 100 / gridSize
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        elements.push(
          <div
            key={`${row}-${col}`}
            className="pixelated-image-card__pixel"
            style={{
              backgroundColor: pixelColor,
              width: `${size}%`,
              height: `${size}%`,
              left: `${col * size}%`,
              top: `${row * size}%`,
            }}
          />,
        )
      }
    }
    return elements
  }, [gridSize, pixelColor])

  const animatePixels = (activate) => {
    setIsActive(activate)

    const pixelGridEl = pixelGridRef.current
    const activeEl = activeRef.current
    if (!pixelGridEl || !activeEl) return

    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel')
    if (!pixels.length) return

    gsap.killTweensOf(pixels)
    if (delayedCallRef.current) {
      delayedCallRef.current.kill()
    }

    gsap.set(pixels, { display: 'none' })

    const totalPixels = pixels.length
    const staggerDuration = animationStepDuration / totalPixels

    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random',
      },
    })

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? 'block' : 'none'
      activeEl.style.pointerEvents = activate ? 'none' : ''
    })

    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random',
      },
    })
  }

  const handleMouseEnter = () => {
    if (!isActive) animatePixels(true)
  }
  const handleMouseLeave = () => {
    if (isActive) {
      const pixelGridEl = pixelGridRef.current
      const activeEl = activeRef.current
      if (pixelGridEl && activeEl) {
        const pixels = pixelGridEl.querySelectorAll(
          '.pixelated-image-card__pixel',
        )
        gsap.killTweensOf(pixels)
        if (delayedCallRef.current) {
          delayedCallRef.current.kill()
        }
        gsap.set(pixels, { display: 'none' })
        activeEl.style.display = 'none'
        activeEl.style.pointerEvents = ''
      }
      setIsActive(false)
    }
  }
  const handleClick = () => {
    animatePixels(!isActive)
  }

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default">{initialContent}</div>
      <div className="pixelated-image-card__active" ref={activeRef}>
        {secondaryContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef}>
        {pixels}
      </div>
    </div>
  )
}
