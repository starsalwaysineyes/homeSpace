import { useState, useRef } from 'react'
import { Mesh } from 'three'

interface WallProps {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  isSelected?: boolean
  onClick: () => void
}

export function Wall({ 
  position, 
  size, 
  color, 
  isSelected = false,
  onClick 
}: WallProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHover] = useState(false)

  return (
    <mesh
      position={position}
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={isSelected ? '#4caf50' : (hovered ? '#ff6b6b' : color)}
        wireframe={isSelected}
      />
    </mesh>
  )
}