import { Box, Typography, Button, IconButton, Paper } from '@mui/material'
import {
    ArrowUpward,
    ArrowDownward,
    ArrowBack,
    ArrowForward,
    Check,
    Delete,
    KeyboardDoubleArrowUp,
    KeyboardDoubleArrowDown
} from '@mui/icons-material'
import type { Entity } from '../types/Entity'

interface ControlPanelProps {
    selectedEntity: Entity | null
    onMove: (axis: 'x' | 'y' | 'z', delta: number) => void
    onConfirm: () => void
    onDelete: () => void
}

export function ControlPanel({ selectedEntity, onMove, onConfirm, onDelete }: ControlPanelProps) {
    if (!selectedEntity) {
        return (
            <Box sx={{ width: 300, minWidth: 300, maxWidth: 300, flexShrink: 0, bgcolor: 'background.paper', borderLeft: 1, borderColor: 'divider', height: '100%', p: 2 }}>
                <Typography variant="body1" color="text.secondary">
                    请选择或添加一个物品以进行编辑
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ width: 300, minWidth: 300, maxWidth: 300, flexShrink: 0, bgcolor: 'background.paper', borderLeft: 1, borderColor: 'divider', height: '100%', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">
                控制面板
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {selectedEntity.name}
            </Typography>

            <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom align="center">位置控制</Typography>

                {/* X Axis */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ width: 40 }}>X轴</Typography>
                    <IconButton onClick={() => onMove('x', -0.5)} size="small"><ArrowBack /></IconButton>
                    <Typography variant="caption">{selectedEntity.position[0].toFixed(1)}</Typography>
                    <IconButton onClick={() => onMove('x', 0.5)} size="small"><ArrowForward /></IconButton>
                </Box>

                {/* Y Axis */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ width: 40 }}>Y轴</Typography>
                    <IconButton onClick={() => onMove('y', -0.5)} size="small"><ArrowDownward /></IconButton>
                    <Typography variant="caption">{selectedEntity.position[1].toFixed(1)}</Typography>
                    <IconButton onClick={() => onMove('y', 0.5)} size="small"><ArrowUpward /></IconButton>
                </Box>

                {/* Z Axis */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ width: 40 }}>Z轴</Typography>
                    <IconButton onClick={() => onMove('z', -0.5)} size="small"><KeyboardDoubleArrowUp /></IconButton>
                    <Typography variant="caption">{selectedEntity.position[2].toFixed(1)}</Typography>
                    <IconButton onClick={() => onMove('z', 0.5)} size="small"><KeyboardDoubleArrowDown /></IconButton>
                </Box>
            </Paper>

            <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Check />}
                    onClick={onConfirm}
                >
                    放置 / 确认
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    startIcon={<Delete />}
                    onClick={onDelete}
                >
                    销毁 / 删除
                </Button>
            </Box>
        </Box>
    )
}
