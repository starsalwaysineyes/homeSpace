@echo off

REM 安装依赖
pip install -r requirements.txt

REM 初始化数据库
python init_db.py

REM 启动服务器
uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause