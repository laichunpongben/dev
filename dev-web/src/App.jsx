import { useEffect, useState } from 'react'
import { Box, IconButton, Typography, Snackbar, Alert } from '@mui/material'
import ShinyText from './components/ShinyText'
import PixelTransition from './components/PixelTransition'
import SplitText from './components/SplitText'
import PublicIcon from '@mui/icons-material/Public'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import * as Icons from '@mui/icons-material'
import { SiKaggle } from 'react-icons/si'
import './App.css'
import AnimatedBackground from './components/AnimatedBackground'
import DecryptedText from './components/DecryptedText'

function App() {
  const [links, setLinks] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  const [showBunny, setShowBunny] = useState(false)
  const [bunnyCount, setBunnyCount] = useState(0)
  const [collapsed, setCollapsed] = useState(true)
  const [showDecrypted, setShowDecrypted] = useState(false)
  const [showTechStack, setShowTechStack] = useState(false)
  const bunnyReverse = bunnyCount % 2 === 0

  const whoAmIText =
    'Who Am I?\n' +
    'An enthusiast of technology and science.\n' +
    'A builder of the next generation intelligence.\n' +
    'A traveler and photographer when out of office.'

  const checkAndOpen = async (url) => {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      if (res.ok) {
        window.location.href = url
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

  const showNextBunny = () => {
    setBunnyCount((c) => c + 1)
    setShowBunny(true)
  }

  const handleTitleClick = () => {
    // restart animation by toggling visibility
    setShowBunny(false)
    setTimeout(showNextBunny, 0)
  }

  const handleSignatureClick = () => {
    setShowDecrypted(true)
    setShowTechStack(false)
    setTimeout(() => {
      setShowDecrypted(false)
      setShowTechStack(false)
    }, 20000)
  }

  const handleDecryptComplete = () => {
    setShowTechStack(true)
  }

  useEffect(() => {
    const id = requestAnimationFrame(showNextBunny)
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (showBunny) {
      const timer = setTimeout(() => setShowBunny(false), 4000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [showBunny])

  useEffect(() => {
    if (alertOpen) {
      const timer = setTimeout(() => setAlertOpen(false), 2000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [alertOpen])

  useEffect(() => {
    fetch('/services.json')
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
      .catch((err) => console.error('Failed to load links', err))
  }, [])

  const visibleLinks = collapsed ? links.filter((l) => l.enabled) : links
  const items = [...visibleLinks, { toggle: true }]

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
      {showBunny && (
        <AnimatedBackground
          className="animated-background"
          reverse={bunnyReverse}
        />
      )}
      <SplitText
        text="Dev Portal"
        className="portal-title"
        onClick={handleTitleClick}
        sx={{
          fontSize: { xs: '1.6rem', sm: '3.2rem' },
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
        className="link-grid"
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
        {items.map((item) => (
          item.toggle ? (
            <IconButton
              key="collapse-toggle"
              sx={{
                width: '100%',
                height: '100%',
                aspectRatio: '1 / 1',
                border: '1px solid #ccc',
                borderRadius: '15px',
                p: 0,
              }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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
      {showDecrypted ? (
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            mx: 'auto',
            mt: { xs: 1, sm: 2 },
            mb: { xs: 1, sm: 2 },
          }}
          display="grid"
          gridTemplateColumns="3fr 1fr"
          gap={2}
        >
          <Box
            sx={{
              textAlign: 'left',
              fontSize: { xs: '0.6rem', sm: '1rem' },
            }}
          >
            <DecryptedText
              text={whoAmIText}
              speed={50}
              sequential={true}
              animateOn="view"
              onComplete={handleDecryptComplete}
            />
          </Box>
          {showTechStack && (
            <Typography
              sx={{
                whiteSpace: 'pre-line',
                fontSize: { xs: '0.6rem', sm: '1rem' },
                textAlign: 'left',
              }}
            >
              {'Tech stack:\nPython\nJavaScript\nLinux'}
            </Typography>
          )}
        </Box>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '3fr repeat(4,1fr)', sm: '2fr repeat(4,1fr)' }}
          gap={{ xs: 1, sm: 2 }}
          className="icon-row"
          alignItems="center"
          sx={{ pt: { xs: 1, sm: 2 } }}
        >
          <ShinyText text="Ben Lai" speed={3} className="signature" onClick={handleSignatureClick} />
          <IconButton
            component="a"
            href="https://github.com/laichunpongben"
            size="medium"
            sx={{
              color: 'inherit',
              borderRadius: '50%',
              aspectRatio: '1 / 1',
              width: '100%',
              '& svg': { fontSize: { xs: '1.5rem', sm: '2rem' } },
            }}
          >
            <Icons.GitHub sx={{ verticalAlign: 'top' }} />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.kaggle.com/benlai"
            size="medium"
            sx={{
              color: 'inherit',
              borderRadius: '50%',
              aspectRatio: '1 / 1',
              width: '100%',
              '& svg': { fontSize: { xs: '1.5rem', sm: '2rem' } },
            }}
          >
            <SiKaggle style={{ verticalAlign: 'top' }} />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/ben-lai-16812667/"
            size="medium"
            sx={{
              color: 'inherit',
              borderRadius: '50%',
              aspectRatio: '1 / 1',
              width: '100%',
              '& svg': { fontSize: { xs: '1.5rem', sm: '2rem' } },
            }}
          >
            <Icons.LinkedIn sx={{ verticalAlign: 'top' }} />
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
              '& svg': { fontSize: { xs: '1.5rem', sm: '2rem' } },
            }}
          >
            <Icons.Email sx={{ verticalAlign: 'top' }} />
          </IconButton>
        </Box>
      )}
      <Typography
        component="footer"
        variant="body2"
        sx={{
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          textAlign: 'center',
          my: { xs: 1, sm: 2 },
          fontSize: { xs: '0.6rem', sm: '0.875rem' },
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
