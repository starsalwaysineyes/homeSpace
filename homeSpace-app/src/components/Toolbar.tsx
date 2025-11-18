import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Box,
  IconButton
} from '@mui/material'
import {
  AddBox,
  ViewInAr,
  Search,
  Save,
  OpenWith
} from '@mui/icons-material'

interface ToolbarProps {
  onAddEntity: (type: string) => void
  onToggleMode: (mode: string) => void
  onSave: () => void
  onSearch: (query: string) => void
}

export function Toolbar({ onAddEntity, onToggleMode, onSave, onSearch }: ToolbarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HomeSpace 3D
        </Typography>

        <ButtonGroup variant="contained" sx={{ mr: 2 }}>
          <Button
            startIcon={<AddBox />}
            onClick={() => onAddEntity('box')}
          >
            添加盒子
          </Button>
          <Button
            startIcon={<ViewInAr />}
            onClick={() => onAddEntity('wall')}
          >
            添加墙体
          </Button>
        </ButtonGroup>

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
      </Toolbar>
    </AppBar>
  )
}