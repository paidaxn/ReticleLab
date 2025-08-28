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