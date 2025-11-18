from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Entity as EntityModel, Item as ItemModel
from schemas import Entity, EntityCreate, EntityUpdate

router = APIRouter(prefix="/entities", tags=["entities"])

@router.post("/", response_model=Entity)
async def create_entity(entity: EntityCreate, db: Session = Depends(get_db)):
    db_entity = EntityModel(**entity.dict())
    db.add(db_entity)
    db.commit()
    db.refresh(db_entity)
    return db_entity

@router.get("/", response_model=List[Entity])
async def get_entities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    entities = db.query(EntityModel).offset(skip).limit(limit).all()
    return entities

@router.get("/{entity_id}", response_model=Entity)
async def get_entity(entity_id: int, db: Session = Depends(get_db)):
    entity = db.query(EntityModel).filter(EntityModel.id == entity_id).first()
    if not entity:
        raise HTTPException(status_code=404, detail="Entity not found")
    return entity

@router.put("/{entity_id}", response_model=Entity)
async def update_entity(entity_id: int, entity: EntityUpdate, db: Session = Depends(get_db)):
    db_entity = db.query(EntityModel).filter(EntityModel.id == entity_id).first()
    if not db_entity:
        raise HTTPException(status_code=404, detail="Entity not found")
    
    for key, value in entity.dict().items():
        setattr(db_entity, key, value)
    
    db.commit()
    db.refresh(db_entity)
    return db_entity

@router.delete("/{entity_id}")
async def delete_entity(entity_id: int, db: Session = Depends(get_db)):
    db_entity = db.query(EntityModel).filter(EntityModel.id == entity_id).first()
    if not db_entity:
        raise HTTPException(status_code=404, detail="Entity not found")
    
    db.delete(db_entity)
    db.commit()
    return {"message": "Entity deleted successfully"}

@router.get("/scene/{scene_id}", response_model=List[Entity])
async def get_entities_by_scene(scene_id: int, db: Session = Depends(get_db)):
    entities = db.query(EntityModel).filter(EntityModel.scene_id == scene_id).all()
    return entities