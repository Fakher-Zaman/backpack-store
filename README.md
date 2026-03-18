# Piccollo Backpack Store

**Modern React e-commerce store for premium backpacks with TypeScript, Tailwind CSS, and animated UI components.**

**Features shopping cart, wishlist, user auth, product reviews, and responsive dark/light theme design.**

## Built with Claude Code

This project was architected and developed using **Claude Code**, an AI-powered development environment that follows strict architectural patterns and coding standards. The entire codebase adheres to production-ready practices with comprehensive testing, type safety, and modern React patterns.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Claude Code Integration](#claude-code-integration)
- [Development Workflow](#development-workflow)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Features](#features)
- [Testing](#testing)
- [Contributing](#contributing)

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + TypeScript strict mode

## Project Architecture

This project follows a **3-layer architecture** enforced by Claude Code:

```
app/                      ← Route entry, root layout, global providers
      ↓
components/<feature>/     ← Feature logic, data fetching, state, side effects
      ↓
components/ui/            ← Presentational only — props in, JSX out, zero logic
```

### Key Architectural Principles

- **Component Co-location**: Related files stay together (`ProductCard.tsx`, `ProductCard.test.tsx`)
- **Single Responsibility**: Each component, hook, and utility has one clear purpose
- **Type-First Development**: Zod schemas generate TypeScript types
- **No Logic in UI Components**: Pure presentation components in `components/ui/`
- **Centralized State**: Context providers for global state, local state for components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd backpack-store

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

The project uses Vite environment variables:

```bash
# Create .env file (if needed)
VITE_API_URL=http://localhost:3000/api
```

## Claude Code Integration

This project leverages **Claude Code's** advanced development capabilities:

### Available Claude Commands

```bash
# Create new features with full scaffolding
/create-feature [feature-name]

# Comprehensive code review
/code-review [file-path] | [commit-hash] | --full

# Smart git commits with conventional format
/commit [message] | --no-verify | --amend
```

### Claude Code Skills Used

- **`frontend-design`**: Production-grade UI components with distinctive aesthetics
- **`code-reviewer`**: Automated code quality analysis and security scanning
- **`unit-test-writer`**: Comprehensive test coverage with best practices

### Development Rules Enforced

- **No `any` types** — strict TypeScript with proper type definitions
- **React Hook Form + Zod** for all forms — no exceptions
- **Tailwind utilities only** — no custom CSS classes
- **Component testing required** — behavior-focused tests
- **Conventional commits** — automated with emoji prefixes

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/product-quick-view

# Use Claude Code to scaffold
/create-feature product-quick-view

# Develop with architectural guidance
# - Types first in types/
# - Service layer with Zod validation  
# - React Query hooks for data fetching
# - Pure UI components
```

### 2. Code Quality

```bash
# Run quality checks
npm run lint
npm run test
npm run build

# Use Claude Code for review
/code-review --full
```

### 3. Commit & Deploy

```bash
# Smart commits with Claude Code
/commit "feat(products): add quick view modal with animations"

# Push changes
git push origin feature/product-quick-view
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint check
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## Project Structure

```
backpack-store/
├── public/                     # Static assets
│   ├── icons/                  # Favicon and app icons
│   └── images/                 # Product images and graphics
│
├── src/
│   ├── app/                    # App setup and routing
│   │   └── App.tsx             # Main app component with providers
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Pure UI components (no logic)
│   │   ├── auth/               # Authentication components
│   │   ├── cart/               # Shopping cart features
│   │   ├── products/           # Product-related components
│   │   ├── wishlist/           # Wishlist functionality
│   │   ├── layout/             # Layout components
│   │   └── pages/              # Page components
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.tsx         # Authentication state
│   │   ├── useCart.tsx         # Shopping cart state
│   │   ├── useWishlist.tsx     # Wishlist state
│   │   └── useTheme.tsx        # Dark/light theme
│   │
│   ├── lib/                    # Utilities and configuration
│   │   ├── utils.ts            # Helper functions (cn, formatPrice)
│   │   └── axios.ts            # HTTP client configuration
│   │
│   ├── data/                   # Static data and fixtures
│   │   ├── products.json       # Product catalog
│   │   ├── collections.ts      # Product collections
│   │   └── blogs.ts            # Blog posts
│   │
│   ├── types/                  # TypeScript type definitions
│   │   ├── product.types.ts    # Product-related types
│   │   ├── cart.types.ts       # Cart and order types
│   │   └── index.ts            # Shared types
│   │
│   ├── styles/                 # Global styles
│   │   └── index.css           # Tailwind directives
│   │
│   └── __tests__/              # Test files
│       ├── components/         # Component tests
│       └── unit/               # Unit tests
│
├── .claude/                    # Claude Code configuration
│   ├── rules/                  # Development rules
│   ├── skills/                 # Available skills
│   └── commands/               # Custom commands
│
└── Configuration Files
    ├── package.json            # Dependencies and scripts
    ├── tsconfig.json           # TypeScript configuration
    ├── tailwind.config.js      # Tailwind CSS setup
    ├── vite.config.ts          # Vite build configuration
    └── vitest.config.ts        # Test configuration
```

## Features

### E-commerce Core
- **Product Catalog**: Browse premium backpacks with filtering
- **Product Details**: Detailed views with image galleries
- **Shopping Cart**: Add/remove items with quantity management
- **Wishlist**: Save favorite products for later
- **Quick View**: Preview products without leaving the grid

### User Experience  
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion for page transitions and micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### User Management
- **Authentication**: Login/logout with persistent sessions
- **User Dashboard**: Order history and account management
- **Protected Routes**: Secure access to user-specific features

### Content & Reviews
- **Product Reviews**: Star ratings and written feedback
- **Blog Section**: Backpack guides and adventure stories
- **FAQ System**: Expandable accordion with common questions

### Quality Assurance
- **Type Safety**: Full TypeScript coverage with strict mode
- **Form Validation**: Zod schemas for runtime type checking
- **Comprehensive Testing**: Unit and component tests with high coverage
- **Error Boundaries**: Graceful error handling and recovery

## Testing

### Test Structure
```bash
src/__tests__/
├── components/          # Component behavior tests
├── unit/               # Hook and utility tests
└── setup.ts            # Test configuration
```

### Testing Philosophy
- **Behavior over Implementation**: Test what users see and do
- **Accessibility Testing**: Screen reader and keyboard navigation
- **Error State Coverage**: Loading, error, and empty states
- **Form Validation**: Valid/invalid inputs and error messages

### Running Tests
```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage
```

## Contributing

### Development Guidelines

1. **Follow the Architecture**: Respect the 3-layer component structure
2. **Types First**: Define Zod schemas before implementation
3. **Test Coverage**: Write tests for new features and bug fixes
4. **Code Review**: Use Claude Code's review capabilities
5. **Conventional Commits**: Follow the established commit format

### Pull Request Process

1. Create feature branch from `main`
2. Develop following architectural patterns
3. Run quality checks (`lint`, `test`, `build`)
4. Use Claude Code for comprehensive review
5. Submit PR with clear description

### Code Standards

- **TypeScript**: Strict mode, no `any` types
- **React**: Functional components with hooks
- **Styling**: Tailwind utilities, no custom CSS
- **Testing**: React Testing Library best practices
- **Accessibility**: WCAG 2.1 AA compliance

## License

This project is private and proprietary.

## Acknowledgments

- **Claude Code**: AI-powered development environment
- **React Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations
- **Vite**: For lightning-fast development experience

---

**Built with ❤️ using Claude Code**
