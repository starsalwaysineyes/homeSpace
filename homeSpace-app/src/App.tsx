import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Scene3D } from './components/Scene3D'
import { Toolbar } from './components/Toolbar'
import { PropertyPanel } from './components/PropertyPanel'

interface Entity {
  id: string
  name: string
  type: string
  position: [number, number, number]
  size: [number, number, number]
  color: string
  isStorageContainer: boolean
  items?: string[]
}

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)
  const [entities, setEntities] = useState<Entity[]>([
    {
      id: '1',
      name: '客厅柜子',
      type: 'box',
      position: [2, 1, 2],
      size: [2, 2, 2],
      color: '#8b4513',
      isStorageContainer: true,
      items: ['钥匙', '手套', '笔']
    },
    {
      id: '2',
      name: '卧室盒子',
      type: 'box',
      position: [-2, 1, -2],
      size: [1, 1, 1],
      color: '#4169e1',
      isStorageContainer: false
    }
  ])

  const handleAddEntity = (type: string) => {
    const newEntity: Entity = {
      id: Date.now().toString(),
      name: `新${type === 'box' ? '盒子' : '墙体'}`,
      type,
      position: [0, 1, 0],
      size: type === 'box' ? [1, 1, 1] : [5, 3, 0.2],
      color: type === 'box' ? '#888888' : '#d3d3d3',
      isStorageContainer: false
    }
    setEntities([...entities, newEntity])
  }

  const handleEntityUpdate = (updatedEntity: Entity) => {
    setEntities(entities.map(entity => 
      entity.id === updatedEntity.id ? updatedEntity : entity
    ))
    setSelectedEntity(updatedEntity)
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) return
    
    const foundItems: string[] = []
    entities.forEach(entity => {
      if (entity.items) {
        entity.items.forEach(item => {
          if (item.toLowerCase().includes(query.toLowerCase())) {
            foundItems.push(`${item} - 存于 [${entity.name}]`)
          }
        })
      }
    })
    
    if (foundItems.length > 0) {
      alert(`找到以下物品：\n${foundItems.join('\n')}`)
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
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `homespace-${Date.now()}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
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
        <PropertyPanel
          entity={selectedEntity}
          onUpdate={handleEntityUpdate}
          onClose={() => setSelectedEntity(null)}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
