from database import engine, Base
from models import Project, Scene, Entity, Item

def create_tables():
    """创建所有数据库表"""
    Base.metadata.create_all(bind=engine)
    print("数据库表创建成功！")

if __name__ == "__main__":
    create_tables()