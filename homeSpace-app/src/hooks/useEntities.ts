import { useState } from 'react'
import type { Entity } from '../types/Entity'

export function useEntities() {
  const [entities, setEntities] = useState<Entity[]>([
    {
      id: '1',
      name: '示例柜子',
      type: 'box',
      position: [2, 1, 2],
      size: [2, 2, 2],
      color: '#8b4513',
      isStorageContainer: true,
      items: ['钥匙', '手套', '笔']
    },
    {
      id: '2',
      name: '示例墙体',
      type: 'wall',
      position: [0, 2.5, -5],
      size: [10, 5, 0.2],
      color: '#d3d3d3',
      isStorageContainer: false
    }
  ])

  const addEntity = (type: 'box' | 'wall', position: [number, number, number]) => {
    const newEntity: Entity = {
      id: Date.now().toString(),
      name: `新${type === 'box' ? '盒子' : '墙体'}`,
      type,
      position,
      size: type === 'box' ? [1, 1, 1] : [5, 3, 0.2],
      color: type === 'box' ? '#888888' : '#d3d3d3',
      isStorageContainer: false
    }
    setEntities([...entities, newEntity])
    return newEntity
  }

  const updateEntity = (id: string, updates: Partial<Entity>) => {
    setEntities(entities.map(entity =>
      entity.id === id ? { ...entity, ...updates } : entity
    ))
  }

  const deleteEntity = (id: string) => {
    setEntities(entities.filter(entity => entity.id !== id))
  }

  const getEntityById = (id: string) => {
    return entities.find(entity => entity.id === id)
  }

  const searchItems = (query: string) => {
    if (!query.trim()) return []

    const results: string[] = []
    entities.forEach(entity => {
      if (entity.items) {
        entity.items.forEach(item => {
          if (item.toLowerCase().includes(query.toLowerCase())) {
            results.push(`${item} - 存于 [${entity.name}]`)
          }
        })
      }
    })

    return results
  }

  return {
    entities,
    addEntity,
    updateEntity,
    deleteEntity,
    getEntityById,
    searchItems
  }
}