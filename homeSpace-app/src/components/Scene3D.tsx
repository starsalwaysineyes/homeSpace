import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { Box } from './Box'
import { Wall } from './Wall'

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 50 }}
      shadows
      style={{ height: '100vh', background: '#f0f0f0' }}
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
        />

        {/* 示例实体 */}
        <Box position={[2, 1, 2]} size={[2, 2, 2]} color="#8b4513" />
        <Box position={[-2, 1, -2]} size={[1, 1, 1]} color="#4169e1" />
        
        {/* 示例墙体 */}
        <Wall position={[0, 2.5, -5]} size={[10, 5, 0.2]} color="#d3d3d3" />

        {/* 轨道控制器 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />

        {/* 环境贴图 */}
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}