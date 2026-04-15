# Interactive Resume - AI Chat Concierge

An innovative, chat-based interactive resume built with the **Strav Framework** - showcasing both the framework itself and a comprehensive portfolio of projects.

🌐 **Live Application: [https://me.liviathan.com/](https://me.liviathan.com/)**

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

4. Start the development server:
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
│   ├── services/       # Business logic
│   └── tools/          # AI tools and integrations
├── data/               # Resume data (markdown files)
│   ├── profile.md      # Personal profile and summary
│   ├── projects.md     # Portfolio projects
│   ├── skills.md       # Technical skills
│   └── system-prompt.md# AI system instructions
├── database/
│   ├── schemas/        # Database table definitions
│   ├── migrations/     # Database migrations
│   └── seeders/        # Data seeders
├── resources/
│   ├── islands/        # Vue.js components
│   ├── views/          # Strav templates
│   └── css/            # Stylesheets
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

## Data Management

The application uses markdown files for portfolio data instead of database storage:

### Resume Content Files
- **`data/profile.md`** - Personal profile, summary, and achievements
- **`data/projects.md`** - Detailed project descriptions and tech stacks
- **`data/skills.md`** - Technical skills with proficiency levels
- **`data/system-prompt.md`** - AI assistant instructions and context

### Updating Content
To modify the resume content:

1. Edit the relevant markdown file in the `data/` directory
2. Restart the development server to reload the content
3. The AI assistant will automatically use the updated information

The AI service reads these files at startup and uses them to provide accurate, contextual responses about skills, projects, and experience.

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
# Run migrations (for chat/conversation data)
bun run strav.ts migrate

# Rollback migrations
bun run strav.ts rollback

# Fresh database (drop all tables and re-migrate)
bun run strav.ts fresh
```

> **Note**: Projects and skills data are stored in markdown files in the `data/` directory, not in the database.

## Deployment

The application can be deployed to any platform supporting Bun:

1. Set production environment variables
2. Run migrations on production database
3. Build and start the application

## License

MIT

---

Built with ❤️ using the Strav Framework