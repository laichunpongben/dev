import { useEffect, useState } from 'react'
import { Box, IconButton, Typography, Snackbar, Alert } from '@mui/material'
import ShinyText from './components/ShinyText'
import PixelTransition from './components/PixelTransition'
import SplitText from './components/SplitText'
import PublicIcon from '@mui/icons-material/Public'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import * as Icons from '@mui/icons-material'
import { SiKaggle } from 'react-icons/si'
import './App.css'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  const [links, setLinks] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)

  const checkAndOpen = async (url) => {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      if (res.ok) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        setAlertOpen(true)
        console.warn(`Link ${url} returned ${res.status}`)
      }
    } catch {
      // if the check fails (e.g. CORS), do not open the link
      setAlertOpen(true)
      console.warn(`Failed to fetch ${url}`)
    }
  }

  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }

  useEffect(() => {
    if (alertOpen) {
      const timer = setTimeout(() => setAlertOpen(false), 2000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [alertOpen])

  useEffect(() => {
    fetch('/subdomains.json')
      .then((res) => res.json())
      .then((data) => {
        const withIcons = data.map((item) => {
          const Icon = item.icon && Icons[item.icon] ? Icons[item.icon] : PublicIcon
          return { ...item, Icon, enabled: item.enabled !== false }
        })
        const sorted = withIcons.sort((a, b) => {
          if (a.enabled === b.enabled) return 0
          return a.enabled ? -1 : 1
        })
        setLinks(sorted)
      })
      .catch((err) => console.error('Failed to load subdomains', err))
  }, [])

  const items = [...links]
  const remainder = links.length % 4
  const placeholders = remainder === 0 ? 0 : 4 - remainder
  for (let i = 0; i < placeholders; i += 1) {
    items.push({ placeholder: true })
  }

  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      width="100%"
      p={{ xs: 0.5, sm: 2 }}
      sx={{ position: 'relative' }}
    >
      <AnimatedBackground className="animated-background" />
      <SplitText
        text="Dev Portal"
        className="portal-title"
        sx={{
          fontSize: { xs: '1.8rem', sm: '3.2rem' },
          my: { xs: 1, sm: 2 },
        }}
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          mt: { xs: 2, sm: 4 },
          flex: '1 1 0px',
          overflowY: 'auto',
          overflowX: 'hidden',
          px: { xs: 0, sm: 0 },
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          gap={{ xs: 1, sm: 2 }}
        >
        {items.map((item, idx) => (
          item.placeholder ? (
            <IconButton
              key={`ph-${idx}`}
              disabled
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                border: '1px solid #ccc',
                borderRadius: '15px',
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          ) : item.enabled ? (
            <Box
              key={item.url}
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
              }}
            >
              <PixelTransition
                style={{ width: '100%', height: '100%' }}
                aspectRatio="0"
                gridSize={12}
                pixelColor="#fff"
                animationStepDuration={0.4}
                firstContent={
                  <IconButton
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: '1px solid #ccc',
                      borderRadius: '15px',
                      p: 0,
                    }}
                    onClick={() => checkAndOpen(item.url)}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      gap={{ xs: 0.5, sm: 1 }}
                      sx={{ width: '100%', height: '100%' }}
                    >
                      {item.Icon ? (
                        <item.Icon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                      ) : (
                        <PublicIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          mt: { xs: 0.25, sm: 0.5 },
                          fontSize: { xs: '0.6rem', sm: '0.75rem' },
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </IconButton>
                }
                secondContent={
                  <IconButton
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: '1px solid #ccc',
                      borderRadius: '15px',
                      p: 0,
                    }}
                    onClick={() => checkAndOpen(item.url)}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      gap={{ xs: 0.5, sm: 1 }}
                      sx={{ width: '100%', height: '100%' }}
                    >
                      {item.Icon ? (
                        <item.Icon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                      ) : (
                        <PublicIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          mt: { xs: 0.25, sm: 0.5 },
                          fontSize: { xs: '0.6rem', sm: '0.75rem' },
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </IconButton>
                }
              />
            </Box>
          ) : (
            <Box
              key={item.url}
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
              }}
            >
              <IconButton
                disabled
                sx={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '15px',
                  p: 0,
                  opacity: 0.5,
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={{ xs: 0.5, sm: 1 }}
                  sx={{ width: '100%', height: '100%' }}
                >
                  {item.Icon ? (
                    <item.Icon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                  ) : (
                    <PublicIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      mt: { xs: 0.25, sm: 0.5 },
                      fontSize: { xs: '0.6rem', sm: '0.75rem' },
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </IconButton>
            </Box>
          )
        ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          mt: { xs: 1, sm: 2 },
          mb: { xs: 1, sm: 2 },
          px: 0,
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '3fr repeat(4,1fr)', sm: '2fr repeat(4,1fr)' }}
          gap={{ xs: 1, sm: 2 }}
          className="icon-row"
          alignItems="center"
        >
        <ShinyText text="Ben Lai" speed={3} className="signature" />
          <IconButton
            component="a"
            href="https://github.com/laichunpongben"
            target="_blank"
            rel="noopener noreferrer"
            size="medium"
            sx={{
              color: 'inherit',
              borderRadius: '50%',
              aspectRatio: '1 / 1',
              width: '100%',
            }}
          >
            <Icons.GitHub fontSize="large" sx={{ verticalAlign: 'top' }} />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.kaggle.com/benlai"
            target="_blank"
            rel="noopener noreferrer"
            size="medium"
            sx={{
              color: 'inherit',
              borderRadius: '50%',
              aspectRatio: '1 / 1',
              width: '100%',
            }}
          >
            <SiKaggle size="1.5em" style={{ verticalAlign: 'top' }} />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/ben-lai-16812667/"
            target="_blank"
            rel="noopener noreferrer"
            size="medium"
            sx={{
              color: 'inherit',
              borderRadius: '50%',
              aspectRatio: '1 / 1',
              width: '100%',
            }}
          >
            <Icons.LinkedIn fontSize="large" sx={{ verticalAlign: 'top' }} />
          </IconButton>
          <IconButton
            component="a"
            href="mailto:laichunpongben@gmail.com"
            size="medium"
            sx={{
              color: 'inherit',
              borderRadius: '50%',
              aspectRatio: '1 / 1',
              width: '100%',
            }}
          >
            <Icons.Email fontSize="large" sx={{ verticalAlign: 'top' }} />
          </IconButton>
        </Box>
      </Box>
      <Typography
        component="footer"
        variant="body2"
        sx={{
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          textAlign: 'center',
          my: { xs: 1, sm: 2 },
          pb: { xs: 1, sm: 0 },
        }}
      >
        © 2025 Databookman by Ben Lai
      </Typography>
      <Snackbar
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Failed to open link
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default App
