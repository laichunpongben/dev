import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText)

export default function SplitText({
  text,
  className = '',
  onClick,
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let splitter
    let targets
    let tl

    document.fonts.ready.then(() => {
      const absoluteLines = splitType === 'lines'
      if (absoluteLines) el.style.position = 'relative'

      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: 'split-line',
        autoSplit: true,
      })

      switch (splitType) {
      case 'lines':
          targets = splitter.lines
          break
      case 'words':
          targets = splitter.words
          break
      case 'words, chars':
          targets = [...splitter.words, ...splitter.chars]
          break
      default:
          targets = splitter.chars
      }

      targets.forEach((t) => {
        t.style.willChange = 'transform, opacity'
      })

      const startPct = (1 - threshold) * 100
      const m = /^(-?\d+)px$/.exec(rootMargin)
      const raw = m ? parseInt(m[1], 10) : 0
      const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`
      const start = `top ${startPct}%${sign}`

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
          once: true,
        },
        smoothChildTiming: true,
        onComplete: onLetterAnimationComplete,
      })

      tl.set(targets, { ...from, immediateRender: false, force3D: true })
      tl.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        force3D: true,
      })
    })

    return () => {
      if (tl) tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      if (targets) gsap.killTweensOf(targets)
      if (splitter) splitter.revert()
    }
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
  ])

  return (
    <p
      ref={ref}
      onClick={onClick}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      }}
    >
      {text}
    </p>
  )
}
