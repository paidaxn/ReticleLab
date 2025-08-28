# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReticleLab is a Valorant crosshair configuration platform built with Next.js 14, TypeScript, and Tailwind CSS. It allows users to browse professional player crosshairs, use a visual editor, and manage their crosshair collections.

## Essential Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production Build
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint checks

# Database (Prisma)
npm run db:generate  # Generate Prisma client after schema changes
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with initial data
```

## Architecture & Key Patterns

### Tech Stack
- **Framework**: Next.js 14 with App Router (React 18)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with Valorant theme colors
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State**: Zustand for client state management
- **Database**: SQLite with Prisma ORM (schema defined, implementation pending)
- **Data Fetching**: TanStack Query setup

### Core Architecture

The application follows a modular component architecture:

1. **Crosshair Rendering Engine**: Canvas-based rendering in `components/crosshair/CrosshairCanvas.tsx` with real-time parameter updates. High-DPI support included.

2. **Data Flow**: Mock data currently in `lib/crosshair/mockCrosshairs.ts`. Database schema ready in `prisma/schema.prisma` for transition to real data.

3. **Type System**: Comprehensive TypeScript interfaces in `types/` directory defining Crosshair, Player, and CrosshairParameters structures.

4. **API Structure**: API routes exist in `app/api/` but are not yet implemented. Database models include User, Crosshair, Player, Favorite, and UsageHistory.

### Key Implementation Details

- **Canvas Rendering**: The crosshair canvas uses 2D context with device pixel ratio scaling for sharp rendering on high-DPI displays
- **Parameter Handling**: Crosshair parameters include inner/outer lines, center dot, movement/firing error, and color/opacity settings
- **Mock Data**: Professional player crosshairs (TenZ, Aspas, Demon1, etc.) are currently hardcoded in mockCrosshairs.ts
- **Route Structure**: 
  - `/` - Landing page
  - `/crosshairs/*` - Crosshair browsing (all, pro, popular, etc.)
  - `/editor` - Visual crosshair editor
  - `/auth/*` - Authentication flows (not yet functional)

### Valorant Theme Integration

CSS variables defined in `app/globals.css`:
- Primary: `#FF4655` (Valorant Red)
- Background Dark: `#0F1923` (Valorant Dark Blue)  
- Background Light: `#ECE8E1` (Valorant Off-White)
- Custom font stack with Valorant fonts

## Development Notes

- API implementation needed - routes exist but return empty responses
- Database integration pending - Prisma schema complete, needs connection and implementation
- Authentication system planned but not implemented
- When modifying crosshair parameters, ensure Canvas component properly re-renders
- Maintain TypeScript strict mode compliance

## Recent Optimizations & Features

### SEO Enhancements
- **Meta Tags & Structured Data**: Complete implementation of meta tags, Open Graph, and Twitter Cards in `lib/seo-metadata.ts`
- **Sitemap & Robots**: Dynamic sitemap generation (`app/sitemap.ts`) and robots.txt (`app/robots.ts`)
- **Page-specific Metadata**: Each page has optimized titles and descriptions for search engines
- **Structured Data**: JSON-LD schema markup for better search visibility

### Performance Optimizations
- **Lazy Loading**: Image lazy loading with loading placeholders (`components/ui/lazy-load.tsx`)
- **Canvas Optimization**: Efficient crosshair rendering with proper cleanup and memoization
- **Bundle Optimization**: Component code splitting and dynamic imports
- **Caching Strategy**: Static asset caching configured in `vercel.json`

### User Experience
- **Keyboard Shortcuts**: 
  - `/` - Focus search
  - `1-4` - Switch filter tabs
  - `Escape` - Clear search
  - `s` - Open sort dropdown
- **Mobile Responsiveness**: Full mobile optimization with touch-friendly UI (min 44px touch targets)
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: User-friendly error pages with recovery options

### Internationalization (i18n)
- **Multi-language Support**: English and Chinese (简体中文) with automatic locale detection
- **Dictionary System**: Centralized translations in `dictionaries/` folder
- **URL-based Routing**: SEO-friendly locale prefixes (`/en/`, `/zh/`)
- **Language Switcher**: Easy language toggle in header

### Accessibility (a11y)
- **ARIA Labels**: Comprehensive ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **Focus Management**: Clear focus indicators and logical tab order

### Security
- **Content Security Policy (CSP)**: Strict CSP headers in middleware
- **Security Headers**: X-Frame-Options, HSTS, and other security headers
- **Input Sanitization**: Safe handling of user inputs
- **No External Dependencies**: Minimal third-party scripts for security

### Code Quality
- **TypeScript Strict Mode**: Full type safety with no any types
- **Component Modularity**: Reusable, well-organized components
- **Custom Hooks**: Abstracted logic in `hooks/` directory
- **Utility Functions**: Centralized utilities in `lib/utils/`

## Important Rules

### Git & Version Control
- **NEVER commit or push code automatically** - Always show changes to the user for review
- **NO git commit or git push without explicit user request** - User will manually commit after reviewing
- Always explain what changes were made and let the user decide when to commit
- If deployment issues occur, explain the fix but let the user handle the commit/push

### Development Guidelines
- **Mobile First**: Always consider mobile UX when making changes
- **Performance**: Monitor bundle size and rendering performance
- **Type Safety**: Maintain TypeScript strict mode compliance
- **Accessibility**: Include ARIA labels and keyboard support
- **Testing**: Test all features on both desktop and mobile before considering complete