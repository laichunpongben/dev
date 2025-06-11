import './ShinyText.css'

const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
  onClick,
}) => {
  const animationDuration = `${speed}s`

  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration }}
      onClick={onClick}
    >
      {text}
    </div>
  )
}

export default ShinyText
