export interface Entity {
  id: string
  name: string
  type: 'box' | 'wall'
  position: [number, number, number]
  size: [number, number, number]
  color: string
  isStorageContainer: boolean
  items?: string[]
}

export interface SceneState {
  entities: Entity[]
  selectedEntity: Entity | null
  isAddingEntity: boolean
  addingEntityType: 'box' | 'wall' | null
}