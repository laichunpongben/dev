import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    fetch('/subdomains.json')
      .then((res) => res.json())
      .then((data) => setLinks(data))
      .catch((err) => console.error('Failed to load subdomains', err))
  }, [])

  return (
    <div className="App">
      <h1>Databookman Portal</h1>
      <ul>
        {links.map((item) => (
          <li key={item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
