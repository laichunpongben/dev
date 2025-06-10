import { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ShinyText from './components/ShinyText'
import PixelTransition from './components/PixelTransition'
import SplitText from './components/SplitText'
import PublicIcon from '@mui/icons-material/Public'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import * as Icons from '@mui/icons-material'
import { SiKaggle } from 'react-icons/si'
import './App.css'

function App() {
  const [links, setLinks] = useState([])

  const checkAndOpen = async (url) => {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      if (res.ok) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        // quietly fail for any non-OK response
        console.warn(`Link ${url} returned ${res.status}`)
      }
    } catch {
      // if the check fails (e.g. CORS), do not open the link
      console.warn(`Failed to fetch ${url}`)
    }
  }

  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }

  useEffect(() => {
    fetch('/subdomains.json')
      .then((res) => res.json())
      .then((data) => {
        const withIcons = data.map((item) => {
          const Icon = item.icon && Icons[item.icon] ? Icons[item.icon] : PublicIcon
          return { ...item, Icon }
        })
        setLinks(withIcons)
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
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <SplitText
        text="Dev Portal"
        className="portal-title"
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
        display="grid"
        gridTemplateColumns="repeat(4, minmax(110px, 1fr))"
        gap={2}
        mt={4}
        pb={4}
        sx={{ maxWidth: 600, mx: 'auto' }}
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
          ) : (
            <PixelTransition
              key={item.url}
              style={{ width: '100%' }}
              aspectRatio="100%"
              gridSize={12}
              pixelColor="#fff"
              animationStepDuration={0.4}
              firstContent={
                <IconButton
                  sx={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    border: '1px solid #ccc',
                    borderRadius: 0,
                    p: 0,
                  }}
                  onClick={() => checkAndOpen(item.url)}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    sx={{ width: '100%', height: '100%' }}
                  >
                    {item.Icon ? (
                      <item.Icon fontSize="large" />
                    ) : (
                      <PublicIcon fontSize="large" />
                    )}
                    <Typography variant="caption" mt={0.5}>
                      {item.name}
                    </Typography>
                  </Box>
                </IconButton>
              }
              secondContent={
                <IconButton
                  sx={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    border: '1px solid #ccc',
                    borderRadius: 0,
                    p: 0,
                  }}
                  onClick={() => checkAndOpen(item.url)}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    sx={{ width: '100%', height: '100%' }}
                  >
                    {item.Icon ? (
                      <item.Icon fontSize="large" />
                    ) : (
                      <PublicIcon fontSize="large" />
                    )}
                    <Typography variant="caption" mt={0.5}>
                      {item.name}
                    </Typography>
                  </Box>
                </IconButton>
              }
            />
          )
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        mb={2}
      >
        <Typography variant="body2" component="span">&lt;</Typography>
        <ShinyText text="Ben Lai" speed={3} className="signature" />
        <Typography variant="body2" component="span">/&gt;</Typography>
        <IconButton
          component="a"
          href="https://github.com/laichunpongben"
          target="_blank"
          rel="noopener noreferrer"
          size="medium"
          sx={{ color: 'inherit', borderRadius: '50%' }}
        >
          <Icons.GitHub fontSize="large" />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.kaggle.com/benlai"
          target="_blank"
          rel="noopener noreferrer"
          size="medium"
          sx={{ color: 'inherit', borderRadius: '50%' }}
        >
          <SiKaggle size="1.5em" />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/ben-lai-16812667/"
          target="_blank"
          rel="noopener noreferrer"
          size="medium"
          sx={{ color: 'inherit', borderRadius: '50%' }}
        >
          <Icons.LinkedIn fontSize="large" />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:laichunpongben@gmail.com"
          size="medium"
          sx={{ color: 'inherit', borderRadius: '50%' }}
        >
          <Icons.Email fontSize="large" />
        </IconButton>
      </Box>
      <Typography component="footer" variant="body2">
        © 2025 Databookman by Ben Lai
      </Typography>
    </Box>
  )
}

export default App
