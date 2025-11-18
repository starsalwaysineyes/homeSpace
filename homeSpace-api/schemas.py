from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# 基础模式
class BaseSchema(BaseModel):
    class Config:
        from_attributes = True

# 项目模式
class ProjectBase(BaseSchema):
    name: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    scenes: List["Scene"] = []

# 场景模式
class SceneBase(BaseSchema):
    name: str
    project_id: int

class SceneCreate(SceneBase):
    pass

class SceneUpdate(SceneBase):
    pass

class Scene(SceneBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    entities: List["Entity"] = []

# 实体模式
class EntityBase(BaseSchema):
    name: str
    type: str
    position_x: float = 0
    position_y: float = 0
    position_z: float = 0
    size_x: float = 1
    size_y: float = 1
    size_z: float = 1
    color: str = "#888888"
    is_storage_container: bool = False
    scene_id: int

class EntityCreate(EntityBase):
    pass

class EntityUpdate(EntityBase):
    pass

class Entity(EntityBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    items: List["Item"] = []

# 物品模式
class ItemBase(BaseSchema):
    name: str
    description: Optional[str] = None
    entity_id: int

class ItemCreate(ItemBase):
    pass

class ItemUpdate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

# 更新前向引用
Project.model_rebuild()
Scene.model_rebuild()
Entity.model_rebuild()