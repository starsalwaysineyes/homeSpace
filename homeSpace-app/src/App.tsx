import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Scene3D } from './components/Scene3D'
import { Toolbar } from './components/Toolbar'

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  const handleAddEntity = (type: string) => {
    console.log('Adding entity:', type)
  }

  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
  }

  const handleSave = () => {
    console.log('Saving project')
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Toolbar
          onAddEntity={handleAddEntity}
          onToggleMode={(mode) => console.log('Mode changed to:', mode)}
          onSave={handleSave}
          onSearch={handleSearch}
        />
        <Scene3D />
      </div>
    </ThemeProvider>
  )
}

export default App
