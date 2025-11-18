from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Item as ItemModel, Entity as EntityModel
from schemas import Item, ItemCreate, ItemUpdate

router = APIRouter(prefix="/items", tags=["items"])

@router.post("/", response_model=Item)
async def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    # 验证实体是否存在
    entity = db.query(EntityModel).filter(EntityModel.id == item.entity_id).first()
    if not entity:
        raise HTTPException(status_code=404, detail="Entity not found")
    
    db_item = ItemModel(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/", response_model=List[Item])
async def get_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = db.query(ItemModel).offset(skip).limit(limit).all()
    return items

@router.get("/{item_id}", response_model=Item)
async def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.put("/{item_id}", response_model=Item)
async def update_item(item_id: int, item: ItemUpdate, db: Session = Depends(get_db)):
    db_item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
async def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted successfully"}

@router.get("/entity/{entity_id}", response_model=List[Item])
async def get_items_by_entity(entity_id: int, db: Session = Depends(get_db)):
    items = db.query(ItemModel).filter(ItemModel.entity_id == entity_id).all()
    return items

@router.get("/search/{query}")
async def search_items(query: str, db: Session = Depends(get_db)):
    # 搜索物品名称
    items = db.query(ItemModel).filter(
        ItemModel.name.contains(query)
    ).all()
    
    # 构建结果，包含实体信息
    results = []
    for item in items:
        entity = db.query(EntityModel).filter(EntityModel.id == item.entity_id).first()
        if entity:
            results.append({
                "item_name": item.name,
                "entity_name": entity.name,
                "entity_id": entity.id,
                "item_id": item.id
            })
    
    return results