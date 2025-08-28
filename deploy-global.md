# 🌍 ReticleLab 全球部署指南

## 最佳方案：Vercel + Cloudflare CDN

### 第一步：部署到 Vercel（5分钟）

1. **访问 Vercel**: https://vercel.com/new/clone?repository-url=https://github.com/paidaxn/ReticleLab

2. **一键部署**：
   - 使用 GitHub 账号登录
   - 选择 `ReticleLab` 项目
   - 点击 `Deploy`
   - 等待 2-3 分钟

3. **获得域名**：
   - 自动获得: `reticlelab.vercel.app`
   - 支持自定义域名

### 第二步：优化中国访问（可选）

#### 选项 A: 使用 Cloudflare（免费）

1. **注册 Cloudflare**: https://dash.cloudflare.com/sign-up
2. **添加站点**：
   - 如果有自定义域名，添加到 Cloudflare
   - 修改 DNS 指向 Vercel
3. **开启优化**：
   - Caching Level: Standard
   - Browser Cache TTL: 4 hours
   - Always Online: On

#### 选项 B: 部署到国内平台

**阿里云静态网站托管**：
```bash
# 安装阿里云 CLI
npm install -g @alicloud/fun

# 构建项目
npm run build
npm run export

# 部署到 OSS
ossutil cp -r out/ oss://your-bucket/ --update
```

**腾讯云静态网站托管**：
```bash
# 安装腾讯云 CLI
npm install -g @cloudbase/cli

# 初始化
tcb init

# 部署
tcb hosting deploy out/ -e your-env-id
```

### 第三步：配置域名加速

#### 国内外分流方案

1. **主域名**: `reticlelab.com` → Cloudflare → Vercel
2. **国内镜像**: `reticlelab.cn` → 阿里云 CDN → 阿里云 OSS

在代码中添加智能跳转：

```javascript
// app/layout.tsx 添加
useEffect(() => {
  // 检测用户地区
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      if (data.country === 'CN' && window.location.hostname === 'reticlelab.com') {
        // 中国用户跳转到国内镜像
        window.location.href = 'https://reticlelab.cn'
      }
    })
}, [])
```

## 🚀 快速部署命令集合

### Vercel 部署（推荐）
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产部署
vercel --prod
```

### Netlify 部署
```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy
netlify deploy --prod
```

### Docker 部署（自有服务器）
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# 构建并运行
docker build -t reticlelab .
docker run -p 3000:3000 reticlelab
```

## 📊 性能优化建议

### 1. 静态资源 CDN
- 图片使用 Cloudinary 或 ImageKit
- JS/CSS 使用 jsDelivr (国内可访问)

### 2. 代码优化
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.jsdelivr.net'],
    deviceSizes: [640, 750, 1080, 1200],
  },
  compress: true,
  poweredByHeader: false,
}
```

### 3. 预加载关键资源
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
```

## 🌐 多区域部署架构

```
用户访问
    ↓
CloudFlare DNS（智能解析）
    ↓
┌─────────┼─────────┐
↓                   ↓
Vercel (全球)    阿里云 (中国)
- 美国            - 北京
- 欧洲            - 上海  
- 新加坡          - 深圳
```

## 📱 访问地址

部署完成后，你将获得：

1. **Vercel 域名**: `https://reticlelab.vercel.app`
2. **Netlify 域名**: `https://reticlelab.netlify.app` 
3. **自定义域名**: `https://reticlelab.com`

## ⚡ 预期性能

- **首次加载**: < 2秒（全球）
- **页面切换**: < 100ms
- **API 响应**: < 200ms
- **中国访问**: < 3秒（使用 CDN）

## 🔧 故障转移

如果主站点不可用，自动切换到备用站点：

```javascript
// 添加到 app/layout.tsx
const PRIMARY_URL = 'https://reticlelab.vercel.app'
const BACKUP_URL = 'https://reticlelab.netlify.app'

// 健康检查
fetch(PRIMARY_URL, { mode: 'no-cors' })
  .catch(() => {
    window.location.href = BACKUP_URL
  })
```

## 💰 成本估算

- **Vercel**: 免费（个人项目）
- **Netlify**: 免费（每月 100GB 流量）
- **Cloudflare**: 免费（基础 CDN）
- **阿里云 OSS**: ~¥10/月（100GB 流量）

总计：**¥0-10/月**