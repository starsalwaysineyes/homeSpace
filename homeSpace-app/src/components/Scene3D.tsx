import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { Suspense } from 'react'
import { Box } from './Box'
import { Wall } from './Wall'
import type { Entity } from '../types/Entity'

interface Scene3DProps {
  entities: Entity[]
  onEntityClick: (entity: Entity) => void
  onGroundClick: (position: [number, number, number]) => void
  selectedEntityId: string | null
}

export function Scene3D({ entities, onEntityClick, onGroundClick, selectedEntityId }: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 50 }}
      shadows
      style={{ height: '100%', background: '#f0f0f0' }}
    >
      <Suspense fallback={null}>
        {/* 环境光和方向光 */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* 网格参考线 */}
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6e6e6e"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#9d4b4b"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={true}
          onClick={(event) => {
            event.stopPropagation()
            const point = event.point
            onGroundClick([point.x, 0, point.z])
          }}
        />

        {/* 渲染所有实体 */}
        {entities.map((entity) => {
          if (entity.type === 'box') {
            return (
              <Box
                key={entity.id}
                position={entity.position}
                size={entity.size}
                color={entity.color}
                isStorageContainer={entity.isStorageContainer}
                isSelected={selectedEntityId === entity.id}
                onClick={() => onEntityClick(entity)}
              />
            )
          } else if (entity.type === 'wall') {
            return (
              <Wall
                key={entity.id}
                position={entity.position}
                size={entity.size}
                color={entity.color}
                isSelected={selectedEntityId === entity.id}
                onClick={() => onEntityClick(entity)}
              />
            )
          }
          return null
        })}

        {/* 轨道控制器 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />
      </Suspense>
    </Canvas>
  )
}