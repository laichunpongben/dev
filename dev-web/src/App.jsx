import { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import PublicIcon from '@mui/icons-material/Public'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import './App.css'

function App() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    fetch('/subdomains.json')
      .then((res) => res.json())
      .then((data) => setLinks(data))
      .catch((err) => console.error('Failed to load subdomains', err))
  }, [])

  const totalSlots = 20
  const items = [...links]
  while (items.length < totalSlots) {
    items.push({ placeholder: true })
  }

  return (
    <Box textAlign="center" p={2}>
      <h1>Databookman Portal</h1>
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
              }}
              onClick={() =>
                window.open(item.url, '_blank', 'noopener,noreferrer')
              }
            >
              <PublicIcon />
            </IconButton>
          )
        ))}
      </Box>
    </Box>
  )
}

export default App
