# All-In-One Life Management App

## Overview

An accessibility-focused life management application designed specifically for young adults (18-22) who struggle with daily task organization due to busy lifestyles or neurodivergent conditions like ADHD and ASD. This comprehensive app consolidates essential life management tools into a single, intuitive platform that works seamlessly across web and mobile devices.

## The Problem We're Solving

Existing apps like TickTick, Any.do, MoneyWiz, Todoist, and Cozi contain pieces of what users need, but force them to juggle multiple applications with inconsistent interfaces and overwhelming feature sets. Young adults, particularly those with ADHD or ASD, need a streamlined solution that reduces cognitive load while providing comprehensive life management tools.

## Core Features

### 🗓️ Unified Calendar System
- Central hub displaying all life activities: appointments, bills, maintenance reminders, medication alerts
- Offline functionality with local device calendar sync
- Accessibility-focused design for neurodivergent users

### 💰 Simple Financial Management
- Paycheck-based bill tracking and budgeting
- Loan payment calculations and debt tracking
- No bank integration complexity - user-controlled data entry

### 🏥 Lightweight Health Tracking
- Medication reminders with customizable schedules
- Water intake, mood tracking, and light exercise logging
- Sleep reminders and expandable self-care modules

### 🚗 Automotive Management
- Maintenance scheduling based on user vehicle data
- Gas mileage tracking with location-based fuel prices
- Smart maintenance suggestions combined with user preferences

### 🔔 Intelligent Notifications
- User-configurable wellness prompts (movement, hydration, grocery planning)
- Designed specifically for ADHD/ASD attention patterns
- Contextual reminders that adapt to user routines

## Technical Approach

This project serves as both a functional application and an educational journey, following industry-standard development practices:

- **Frontend**: React.js + TypeScript (web), React Native (mobile)
- **Backend**: Node.js + Express.js + PostgreSQL
- **Architecture**: Monorepo structure with shared components
- **Methodology**: Agile development with comprehensive testing
- **Focus**: Accessibility-first design and offline-capable functionality

## Educational Mission

Every aspect of this project is documented with detailed explanations of code, methodologies, and industry best practices. This repository serves as a learning resource for understanding modern full-stack development while building a meaningful application that addresses real accessibility needs.

## Getting Started

This project follows a structured, educational development approach. See our [Educational Development Specification](educational-app-development-spec.md) for detailed learning modules and step-by-step implementation guidance.

## Project Status

✅ **Phase 1 Complete**: Development Environment Setup & Project Foundation
✅ **Phase 2A Complete**: Secure Database Foundation
✅ **Phase 2B Complete**: Prisma ORM Setup & Database Models
✅ **Phase 2C Complete**: Authentication System (Full Implementation)
🚧 **Currently in Phase 2D**: Calendar API Development

### Completed Milestones:
- ✅ Node.js v22.20.0 installed and configured
- ✅ Git repository initialized and connected to GitHub
- ✅ Monorepo project structure created
- ✅ TypeScript + Express.js API server running
- ✅ Development workflow with auto-restart (nodemon)
- ✅ Security middleware implemented (helmet, cors, morgan)
- ✅ Environment configuration setup
- ✅ First API endpoint functional (`GET /` returns JSON response)
- ✅ Docker containerization setup
- ✅ PostgreSQL 15 database with security extensions
- ✅ Database encryption capabilities (pgcrypto, uuid-ossp)
- ✅ Audit logging system for security compliance
- ✅ Comprehensive security specification documented
- ✅ Prisma ORM configured with TypeScript integration
- ✅ Database models created (User, Calendar, Event)
- ✅ Database migrations and seeding working
- ✅ Password hashing utilities (bcrypt with 12 salt rounds)
- ✅ JWT token management (access + refresh tokens)
- ✅ Input validation schemas (Joi-based security)
- ✅ Authentication utilities tested and verified
- ✅ Authentication middleware implemented
- ✅ Complete authentication API (register, login, refresh, logout)
- ✅ End-to-end authentication flow tested and working

---

*Building technology that works for everyone, especially those who need it most.*
