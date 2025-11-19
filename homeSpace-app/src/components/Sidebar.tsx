import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material'
import { ViewInAr, TableRestaurant } from '@mui/icons-material'

interface SidebarProps {
  onAddEntity: (type: 'box' | 'wall') => void
}

export function Sidebar({ onAddEntity }: SidebarProps) {
  return (
    <Box sx={{ width: 240, minWidth: 240, maxWidth: 240, flexShrink: 0, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider', height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        物品库
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onAddEntity('box')}>
            <ListItemIcon>
              <TableRestaurant />
            </ListItemIcon>
            <ListItemText primary="盒子 (Box)" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onAddEntity('wall')}>
            <ListItemIcon>
              <ViewInAr />
            </ListItemIcon>
            <ListItemText primary="墙体 (Wall)" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
