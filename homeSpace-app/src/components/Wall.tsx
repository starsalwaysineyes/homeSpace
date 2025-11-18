import { Mesh } from 'three'
import { useRef } from 'react'

interface WallProps {
  position: [number, number, number]
  size: [number, number, number]
  color: string
}

export function Wall({ position, size, color }: WallProps) {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh
      position={position}
      ref={meshRef}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}