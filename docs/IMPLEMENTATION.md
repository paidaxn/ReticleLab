# 复制和收藏功能实现文档

## 当前实现状态

### ✅ 已完成
1. **数据库架构** - Prisma Schema定义完整
2. **SQLite数据库** - 本地开发数据库已初始化，包含209个准心数据
3. **API接口** - 已创建但暂未启用（Next.js 14 App Router配置需调整）
4. **本地存储方案** - 使用localStorage实现数据持久化
5. **前端功能** - 复制和收藏功能完全可用

### 🔧 当前解决方案

使用了**混合方案**确保功能立即可用：

#### 前端（已实现）
- 使用 `localStorage` 存储用户的复制和收藏数据
- 数据在用户浏览器中持久化保存
- 实时更新显示

#### 后端（已准备，待集成）
- SQLite数据库已配置
- API路由已创建
- 可随时切换到服务器端存储

## 使用方式

### 开发环境
```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
# 点击复制和收藏按钮，数据会实时更新
```

### 数据持久化
- **本地存储**：数据保存在浏览器的localStorage中
- **跨设备**：每个设备独立存储（暂不同步）
- **清除数据**：清除浏览器缓存会重置数据

## 迁移到Supabase（上线前）

### 步骤1：注册Supabase
1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 获取数据库连接字符串

### 步骤2：更新配置
```bash
# .env.local
DATABASE_URL="postgresql://[连接字符串]"
```

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"  // 改为postgresql
  url      = env("DATABASE_URL")
}
```

### 步骤3：迁移数据
```bash
npm run db:push
npm run db:seed
```

### 步骤4：启用API
将组件中的本地存储调用改回API调用：
- `lib/storage/crosshair-stats.ts` → `lib/api/crosshairs.ts`

## 技术栈

- **数据库**：SQLite（开发）/ PostgreSQL（生产）
- **ORM**：Prisma
- **API**：Next.js API Routes
- **前端状态**：React useState + localStorage

## 注意事项

1. **API路由问题**：Next.js 14的App Router可能需要额外配置才能正确识别API路由
2. **数据同步**：当前localStorage方案不支持跨设备同步
3. **数据迁移**：上线时需要考虑是否保留用户的本地数据

## 下一步计划

1. ✅ 修复API路由配置问题
2. ⏳ 集成Supabase
3. ⏳ 实现用户认证（可选）
4. ⏳ 添加数据分析仪表板