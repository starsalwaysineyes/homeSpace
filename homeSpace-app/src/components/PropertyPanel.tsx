import {
  Drawer,
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider
} from '@mui/material'
import { useState } from 'react'

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

interface PropertyPanelProps {
  entity: Entity | null
  onUpdate: (entity: Entity) => void
  onClose: () => void
}

export function PropertyPanel({ entity, onUpdate, onClose }: PropertyPanelProps) {
  const [localEntity, setLocalEntity] = useState<Entity | null>(entity)

  if (!localEntity) return null

  const handleUpdate = (updates: Partial<Entity>) => {
    const updated = { ...localEntity, ...updates }
    setLocalEntity(updated)
    onUpdate(updated)
  }

  return (
    <Drawer
      anchor="right"
      open={!!entity}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: 300 } }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          属性面板
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <TextField
          fullWidth
          label="名称"
          value={localEntity.name}
          onChange={(e) => handleUpdate({ name: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="类型"
          value={localEntity.type}
          disabled
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle2" gutterBottom>
          位置 (X, Y, Z)
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {localEntity.position.map((pos, index) => (
            <TextField
              key={index}
              type="number"
              value={pos}
              onChange={(e) => {
                const newPosition = [...localEntity.position] as [number, number, number]
                newPosition[index] = parseFloat(e.target.value) || 0
                handleUpdate({ position: newPosition })
              }}
              size="small"
            />
          ))}
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          尺寸 (长, 宽, 高)
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {localEntity.size.map((size, index) => (
            <TextField
              key={index}
              type="number"
              value={size}
              onChange={(e) => {
                const newSize = [...localEntity.size] as [number, number, number]
                newSize[index] = parseFloat(e.target.value) || 1
                handleUpdate({ size: newSize })
              }}
              size="small"
            />
          ))}
        </Box>

        <TextField
          fullWidth
          label="颜色"
          value={localEntity.color}
          onChange={(e) => handleUpdate({ color: e.target.value })}
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={localEntity.isStorageContainer}
              onChange={(e) => handleUpdate({ isStorageContainer: e.target.checked })}
            />
          }
          label="是存储容器"
          sx={{ mb: 2 }}
        />

        {localEntity.isStorageContainer && (
          <>
            <Typography variant="subtitle2" gutterBottom>
              存储的物品
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="输入物品，每行一个"
              value={localEntity.items?.join('\n') || ''}
              onChange={(e) => handleUpdate({ 
                items: e.target.value.split('\n').filter(item => item.trim()) 
              })}
              sx={{ mb: 2 }}
            />
          </>
        )}

        <Button variant="contained" onClick={onClose} fullWidth>
          关闭
        </Button>
      </Box>
    </Drawer>
  )
}