# Interactive Resume - AI Chat Concierge

An innovative, chat-based interactive resume built with the **Strav Framework** - showcasing both the framework itself and a comprehensive portfolio of projects.

## Features

- 🤖 **AI-Powered Chat Interface** - Natural conversation about projects, skills, and experience
- 🚀 **Real-time Communication** - WebSocket-based chat with typing indicators
- 🎨 **Minimalist Design** - Clean, modern UI with light/dark theme support
- 📊 **Project Showcase** - Interactive exploration of portfolio projects
- ⚡ **Built with Strav** - Demonstrating the framework's capabilities

## Tech Stack

- **Framework**: Strav (custom-built TypeScript framework)
- **Runtime**: Bun
- **Frontend**: Vue.js islands, WebSockets
- **Database**: SQLite (development) / PostgreSQL (production)
- **Styling**: Custom CSS with Barlow Semi Condensed & Cormorant Garamond fonts

## Getting Started

### Prerequisites

- Bun installed (v1.0+)
- SQLite for development

### Installation

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Run database migrations:
```bash
bun run strav.ts migrate
```

4. Seed the database with projects and skills:
```bash
bun run strav.ts seed --seeder=ProjectsAndSkillsSeeder
```

5. Start the development server:
```bash
bun dev
```

Visit `http://localhost:3000` to see the interactive resume!

## Project Structure

```
resume/
├── app/
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   └── services/       # Business logic
├── database/
│   ├── schemas/        # Database table definitions
│   ├── migrations/     # Database migrations
│   └── seeders/        # Data seeders
├── islands/            # Vue.js components
├── resources/
│   └── views/          # Strav templates
├── config/             # Configuration files
└── start/
    └── routes.ts       # Application routes
```

## Key Features Demonstrated

### Strav Framework Capabilities
- Dependency injection and service providers
- Real-time WebSocket broadcasting
- ORM with migrations and seeders
- Vue.js islands for interactivity
- Template engine with layouts

### Portfolio Projects
- **Strav Framework** - The framework powering this application
- **3D Konfigurator** - Three.js product customization
- **Infrastructure Portal** - AWS/Terraform management
- **E-commerce Suite** - Complete retail solution
- **Production System** - Manufacturing execution

## Development

### Running Tests
```bash
bun test
```

### Building for Production
```bash
bun build
```

### Database Commands
```bash
# Run migrations
bun run strav.ts migrate

# Rollback migrations
bun run strav.ts rollback

# Fresh database (drop all tables and re-migrate)
bun run strav.ts fresh

# Run seeders
bun run strav.ts seed
```

## Deployment

The application can be deployed to any platform supporting Bun:

1. Set production environment variables
2. Run migrations on production database
3. Build and start the application

## License

MIT

---

Built with ❤️ using the Strav Framework