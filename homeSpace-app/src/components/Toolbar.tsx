import { useState } from 'react'
import {
  AppBar,
  Toolbar as MuiToolbar,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Box,
  IconButton,
  Chip
} from '@mui/material'
import {
  AddBox,
  ViewInAr,
  Search,
  Save,
  OpenWith,
  Close
} from '@mui/icons-material'

interface ToolbarProps {
  onAddEntity: (type: string) => void
  onToggleMode: (mode: string) => void
  onSave: () => void
  onSearch: (query: string) => void
  isAddingEntity: boolean
  currentAddingMode: 'box' | 'wall' | null
  onCancelAdding: () => void
  onDeleteSelected: () => void
  hasSelectedEntity: boolean
}

export function Toolbar({ 
  onAddEntity, 
  onToggleMode, 
  onSave, 
  onSearch, 
  isAddingEntity,
  currentAddingMode,
  onCancelAdding,
  onDeleteSelected,
  hasSelectedEntity
}: ToolbarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleAddEntity = (type: 'box' | 'wall') => {
    if (isAddingEntity && currentAddingMode === type) {
      onCancelAdding()
    } else {
      onAddEntity(type)
    }
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <MuiToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HomeSpace 3D
        </Typography>

        {/* 添加模式指示器 */}
        {isAddingEntity && (
          <Chip
            label={`正在添加${currentAddingMode === 'box' ? '盒子' : '墙体'} - 点击地面放置`}
            color="warning"
            onDelete={onCancelAdding}
            deleteIcon={<Close />}
            sx={{ mr: 2 }}
          />
        )}

        <ButtonGroup variant="contained" sx={{ mr: 2 }}>
          <Button
            startIcon={<AddBox />}
            onClick={() => handleAddEntity('box')}
            variant={isAddingEntity && currentAddingMode === 'box' ? 'contained' : 'outlined'}
            color={isAddingEntity && currentAddingMode === 'box' ? 'warning' : 'primary'}
          >
            添加盒子
          </Button>
          <Button
            startIcon={<ViewInAr />}
            onClick={() => handleAddEntity('wall')}
            variant={isAddingEntity && currentAddingMode === 'wall' ? 'contained' : 'outlined'}
            color={isAddingEntity && currentAddingMode === 'wall' ? 'warning' : 'primary'}
          >
            添加墙体
          </Button>
        </ButtonGroup>

        {/* 删除按钮 */}
        {hasSelectedEntity && (
          <Button
            variant="outlined"
            color="error"
            onClick={onDeleteSelected}
            sx={{ mr: 2 }}
          >
            删除选中
          </Button>
        )}

        <TextField
          size="small"
          placeholder="搜索物品..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          sx={{ mr: 2, backgroundColor: 'white', borderRadius: 1 }}
        />

        <IconButton color="inherit" onClick={handleSearch}>
          <Search />
        </IconButton>

        <IconButton color="inherit" onClick={onSave}>
          <Save />
        </IconButton>
      </MuiToolbar>
    </AppBar>
  )
}