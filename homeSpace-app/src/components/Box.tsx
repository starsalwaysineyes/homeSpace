import { useState, useRef } from 'react'
import { Mesh } from 'three'

interface BoxProps {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  isStorageContainer?: boolean
  isSelected?: boolean
  onClick: () => void
}

export function Box({
  position,
  size,
  color,
  isStorageContainer = false,
  isSelected = false,
  onClick
}: BoxProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHover] = useState(false)

  return (
    <mesh
      position={position}
      ref={meshRef}
      scale={isSelected ? 1.05 : (hovered ? 1.02 : 1)}
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
        opacity={isStorageContainer ? 0.9 : 1}
        transparent={isStorageContainer}
        wireframe={isSelected}
      />
    </mesh>
  )
}