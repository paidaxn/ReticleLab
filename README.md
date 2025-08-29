# ReticleLab - Valorant Crosshair Configuration Platform

A modern web application for browsing, editing and managing Valorant crosshairs from professional players.

## Deployment

This project is configured for deployment on Cloudflare Pages with Edge Runtime support.

### Build Configuration
- Framework: Next.js 14
- Runtime: Edge Runtime (required for Cloudflare Pages)
- Build Command: `npx @cloudflare/next-on-pages@1`
- Output Directory: `.vercel/output/static`

## Features

- 🎯 Browse professional player crosshairs
- ✏️ Visual crosshair editor
- 💾 Save favorite crosshairs
- 🌍 Multi-language support (EN/ZH)
- 📱 Mobile responsive design

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```