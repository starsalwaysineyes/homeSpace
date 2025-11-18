# HomeSpace 3D - 您的三维家庭物品索引

一个基于Web的3D家庭环境建模与物品索引应用，帮助您直观地管理和查找家庭中的物品。

## 功能特性

- 🏠 **3D空间建模** - 在3D空间中直接搭建家庭布局
- 📦 **实体管理** - 添加、编辑、删除家具和容器
- 🔍 **物品索引** - 为存储容器添加物品，支持快速搜索
- 🎨 **自定义外观** - 调整实体的颜色、尺寸和位置
- 💾 **项目保存** - 导出和导入3D场景数据
- 🤖 **AI赋能** - 支持自然语言添加、移动、删除物品(规划中)

## 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **3D渲染**: Three.js + React Three Fiber + React Three Drei
- **UI组件**: Material-UI (MUI)
- **构建工具**: Vite

### 后端
- **框架**: Python + FastAPI
- **数据库**: MySQL
- **ORM**: SQLAlchemy
- **认证**: JWT (规划中)

## 快速开始

### 环境要求

- Node.js 18+
- Python 3.9+
- MySQL 8.0+

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd homeSpace
```

2. **启动前端**
```bash
cd homeSpace-app
npm install
npm run dev
```

3. **启动后端**

首先配置数据库：
```bash
# 创建MySQL数据库
mysql -u root -p
CREATE DATABASE homespace;
```

然后启动后端服务：
```bash
cd homeSpace-api
pip install -r requirements.txt
# 配置.env文件中的数据库连接信息
python init_db.py
uvicorn main:app --reload
```

或者使用启动脚本：
- Windows: `start.bat`
- Linux/Mac: `./start.sh`

### 访问应用

- 前端: http://localhost:5173
- 后端API: http://localhost:8000
- API文档: http://localhost:8000/docs

## 项目结构

```
homeSpace/
├── homeSpace-app/          # 前端应用
│   ├── src/
│   │   ├── components/     # React组件
│   │   │   ├── Scene3D.tsx # 3D场景组件
│   │   │   ├── Box.tsx     # 盒子实体组件
│   │   │   ├── Wall.tsx    # 墙体组件
│   │   │   ├── Toolbar.tsx # 工具栏
│   │   │   └── PropertyPanel.tsx # 属性面板
│   │   └── App.tsx         # 主应用组件
│   └── package.json
├── homeSpace-api/          # 后端API
│   ├── routers/            # API路由
│   │   ├── projects.py     # 项目管理
│   │   ├── entities.py     # 实体管理
│   │   └── items.py        # 物品管理
│   ├── models.py           # 数据模型
│   ├── schemas.py          # Pydantic模式
│   ├── database.py         # 数据库配置
│   └── main.py             # 应用入口
├── 需求文档.md             # 详细需求文档
└── README.md
```

## API接口

### 项目管理
- `GET /projects` - 获取项目列表
- `POST /projects` - 创建新项目
- `GET /projects/{id}` - 获取项目详情
- `PUT /projects/{id}` - 更新项目
- `DELETE /projects/{id}` - 删除项目

### 实体管理
- `GET /entities` - 获取实体列表
- `POST /entities` - 创建新实体
- `GET /entities/{id}` - 获取实体详情
- `PUT /entities/{id}` - 更新实体
- `DELETE /entities/{id}` - 删除实体

### 物品管理
- `GET /items` - 获取物品列表
- `POST /items` - 添加新物品
- `GET /items/search/{query}` - 搜索物品
- `PUT /items/{id}` - 更新物品
- `DELETE /items/{id}` - 删除物品

## 开发指南

### 添加新的3D实体类型

1. 在 `homeSpace-app/src/components/` 创建新的组件
2. 在 `Scene3D.tsx` 中导入并使用新组件
3. 在后端 `models.py` 中添加对应的数据模型

### 扩展API功能

1. 在 `routers/` 目录下创建新的路由文件
2. 在 `main.py` 中包含新路由
3. 更新 `schemas.py` 添加数据验证模式

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件至 [your-email@example.com]

## 更新日志

### v1.0.0 (开发中)
- ✅ 基础3D场景渲染
- ✅ 实体管理功能
- ✅ 物品存储和搜索
- ✅ 项目保存/加载
- 🚧 AI赋能功能(规划中)
- 🚧 用户系统(规划中)
- 🚧 云同步(规划中)