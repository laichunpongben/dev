import { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import PublicIcon from '@mui/icons-material/Public'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import './App.css'

function App() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    fetch('/subdomains.json')
      .then((res) => res.json())
      .then(async (data) => {
        const withIcons = await Promise.all(
          data.map(async (item) => {
            let Icon = PublicIcon
            if (item.icon) {
              try {
                const mod = await import(
                  /* @vite-ignore */ `@mui/icons-material/${item.icon}`
                )
                Icon = mod.default
              } catch (err) {
                console.error(`Failed to load icon ${item.icon}`, err)
              }
            }
            return { ...item, Icon }
          })
        )
        setLinks(withIcons)
      })
      .catch((err) => console.error('Failed to load subdomains', err))
  }, [])

  const totalSlots = 20
  const items = [...links]
  while (items.length < totalSlots) {
    items.push({ placeholder: true })
  }

  return (
    <Box textAlign="center" p={2}>
      <h1>Dev Portal</h1>
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        gap={2}
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
                borderRadius: 0,
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          ) : (
            <IconButton
              key={item.url}
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                border: '1px solid #ccc',
                borderRadius: 0,
                p: 0,
              }}
              onClick={() =>
                window.open(item.url, '_blank', 'noopener,noreferrer')
              }
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
          )
        ))}
      </Box>
    </Box>
  )
}

export default App
