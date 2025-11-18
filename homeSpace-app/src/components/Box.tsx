import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import * as THREE from 'three'

interface BoxProps {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  isStorageContainer?: boolean
}

export function Box({ position, size, color, isStorageContainer = false }: BoxProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current && active) {
      meshRef.current.rotation.y += delta
    }
  })

  return (
    <mesh
      position={position}
      ref={meshRef}
      scale={active ? 1.1 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={hovered ? '#ff6b6b' : color}
        opacity={isStorageContainer ? 0.9 : 1}
        transparent={isStorageContainer}
      />
      {isStorageContainer && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
          <lineBasicMaterial color="#000000" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  )
}