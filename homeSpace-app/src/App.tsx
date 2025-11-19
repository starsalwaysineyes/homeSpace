import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { Scene3D } from './components/Scene3D'
import { Toolbar } from './components/Toolbar'
import { Sidebar } from './components/Sidebar'
import { ControlPanel } from './components/ControlPanel'
import { useEntities } from './hooks/useEntities'
import type { Entity } from './types/Entity'

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  const {
    entities,
    addEntity,
    updateEntity,
    deleteEntity,
    searchItems
  } = useEntities()

  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)
  // We no longer need isAddingEntity state for the "click ground" mode as we spawn immediately
  // But we might want to keep it if we want to support both. 
  // For now, let's follow the new requirement: Select from sidebar -> Spawn -> Move -> Confirm.

  const handleAddEntity = (type: 'box' | 'wall') => {
    // Spawn at a default position (e.g., center of the room, slightly above ground)
    const defaultPosition: [number, number, number] = [0, 1, 0]
    const newEntity = addEntity(type, defaultPosition)
    setSelectedEntity(newEntity)
  }

  const handleEntityClick = (entity: Entity) => {
    setSelectedEntity(entity)
  }

  const handleMoveEntity = (axis: 'x' | 'y' | 'z', delta: number) => {
    if (!selectedEntity) return

    const newPosition = [...selectedEntity.position] as [number, number, number]
    const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
    newPosition[axisIndex] += delta

    updateEntity(selectedEntity.id, { position: newPosition })

    // Update local selected entity state to reflect changes immediately in UI
    setSelectedEntity({
      ...selectedEntity,
      position: newPosition
    })
  }

  const handleConfirm = () => {
    setSelectedEntity(null)
  }

  const handleDelete = () => {
    if (selectedEntity) {
      deleteEntity(selectedEntity.id)
      setSelectedEntity(null)
    }
  }

  const handleSearch = (query: string) => {
    const results = searchItems(query)
    if (results.length > 0) {
      alert(`找到以下物品：\n${results.join('\n')}`)
    } else {
      alert(`未找到包含 "${query}" 的物品`)
    }
  }

  const handleSave = () => {
    const projectData = {
      entities,
      timestamp: new Date().toISOString()
    }
    const dataStr = JSON.stringify(projectData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

    const exportFileDefaultName = `homespace-${Date.now()}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Top Toolbar - Simplified */}
        <Toolbar
          onAddEntity={() => { }} // No longer used from top bar
          onToggleMode={(mode) => console.log('Mode changed to:', mode)}
          onSave={handleSave}
          onSearch={handleSearch}
          isAddingEntity={false}
          currentAddingMode={null}
          onCancelAdding={() => { }}
          onDeleteSelected={handleDelete}
          hasSelectedEntity={!!selectedEntity}
        />

        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Sidebar */}
          <Sidebar onAddEntity={handleAddEntity} />

          {/* Center Scene */}
          <Box sx={{ flex: 1, position: 'relative' }}>
            <Scene3D
              entities={entities}
              onEntityClick={handleEntityClick}
              onGroundClick={() => setSelectedEntity(null)} // Click ground to deselect
              selectedEntityId={selectedEntity?.id || null}
            />
          </Box>

          {/* Right Control Panel */}
          <ControlPanel
            selectedEntity={selectedEntity}
            onMove={handleMoveEntity}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
