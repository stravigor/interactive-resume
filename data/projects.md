# Projects Portfolio

## Befeni E-commerce Platform

### Description
E-commerce platform where shirt resellers in Germany design custom-made shirts and dresses - selecting fabrics, collars, cuffs, and inputting body measurements — with orders fulfilled by a garment factory in Bangkok.

**Context:** Befeni is a fashion-tech company positioned as an alternative to fast fashion. Their network of independent resellers across Germany meets customers in person, takes measurements, and designs custom garments. They needed a platform that could handle the full flow: reseller onboarding, interactive garment design, measurement capture, order management, and routing orders to the factory in Bangkok for production and delivery within 4 weeks.

**My role:** Backend & Frontend Lead. Responsible for the platform architecture, the garment configuration engine (fabric/collar/cuff combinations with validation rules and pricing logic), the multi-tenant system so each reseller has their own workspace, and the order pipeline that connects the storefront to the factory ERP. (Add team size if relevant, e.g. "Led a team of X developers.")

Key decisions:

**Multi-tenant architecture** — each reseller operates in an isolated workspace with their own customers, orders, and commission tracking, while Befeni HQ has a global admin view across all tenants.
**Garment configuration engine** — not every fabric works with every collar or cuff style. Built a rule-based system that constrains valid combinations, calculates pricing dynamically, and renders a visual preview for the reseller.
**Two frontend stacks (React + Vue)** - we deliberately built different features in each framework to evaluate which was the better fit for the team and product: shirt designer and shopping cart in Vue.js, fabric explorer and fabric book in React. After working extensively with both in production, Vue.js won out for its smaller footprint and versatility. 

**Tech Stack:** PHP, MySQL, Vue.js, React

---

## Custom ERP System for garment manufacturing
**Category:** Backend | **Priority:** 80
**Role:** System Architect

### Description
Factory ERP that receives custom shirt orders from the Befeni e-commerce platform and tracks them through every production stage - from fabric cutting to shipping.

**Context:** The Befeni garment factory in Bangkok receives hundreds of unique, made-to-measure shirt orders from German resellers. Every shirt has different fabric, measurements, collar, and cuff specs. The factory needed a system to ingest these orders automatically, break them into production steps, and track each shirt through cutting, stitching, finishing, QC, packaging, and shipping - while managing fabric inventory and supplier fulfillment.

**My role:** System Architect. Worked on core systems across the ERP, including:

**ACL system** - designed a role-based access control layer so factory floor staff, QC inspectors, warehouse workers, and managers each see only what's relevant to their role.
**Box management system** - built an optimized packing algorithm that groups finished shirts into shipment boxes efficiently, reducing shipping costs and wasted space.
**Fabric usage calculation** - each custom shirt has different measurements and style choices. Built a calculation engine that determines exact fabric consumption per order (main fabric, collar fabric, cuff fabric), feeding into inventory tracking and procurement.
**Fabric analytics** - detailed dashboards breaking down fabric usage by type and component, helping the factory forecast demand and identify waste.

**Tech Stack:** PHP/Laravel, MySQL, Vue.js

---

## Strav Framework
**GitHub:** https://github.com/stravigor/strav

### Description

A full-stack TypeScript framework for Bun - aiming to be the Laravel of the TypeScript ecosystem.
**Context:** Bun is a fast-growing JS runtime, but it lacks a cohesive full-stack framework. Existing Bun-compatible libraries like ElysiaJS and Hono cover routing but don't offer the batteries-included experience that Laravel gives PHP developers - no built-in ORM, no DI container, no real-time layer, no CLI scaffolding. Developers end up stitching together dozens of packages. Strav is designed to fill that gap.

**My role:** Creator & sole architect. I designed the full system architecture - module boundaries, the DI container API, ORM query builder design, the Vue islands hydration strategy, and the CLI interface. Implementation is done collaboratively with Claude Code, which I direct and review. This project is also a case study in AI-assisted development: I focus on architecture and design decisions while delegating implementation to an AI coding agent.

Key decisions:
- **IoC container as the backbone** — everything (routes, services, WebSocket channels) registers through DI, keeping modules decoupled and testable.
- **Vue.js islands over full SPA** — gives developers SSR performance by default with interactive islands where needed, avoiding the hydration cost of shipping a full Vue app.
- **Laravel-inspired conventions** — familiar patterns (migrations, artisan-like CLI, broadcasting channels) so developers with Laravel experience feel at home immediately.

**Tech Stack:** TypeScript, Bun, Vue.js, PostgreSQL, WebSockets

### Key Features
- IoC Container with dependency injection
- Real-time broadcasting with channels
- Type-safe ORM with migrations
- Vue.js islands architecture
- Comprehensive CLI tools
- Built for Bun runtime

---

## Infrastructure Management Portal

### Description
Internal platform that lets developers instantly spin up EC2 instances for feature testing, then destroy them immediately after validation - built as a team learning initiative to explore modern DevOps technologies.

**Context:** Our development team needed a way to quickly deploy feature branches for product owner validation without keeping expensive EC2 instances running 24/7. Previously, developers would manually provision instances through AWS console, often forgetting to terminate them after testing, leading to unnecessary costs. This project served dual purposes: explore new technologies like Terraform and AdonisJS while solving our immediate need for on-demand test environments.

**My role:** Full-Stack Developer & Tech Lead for the learning initiative. Led the team's exploration into Infrastructure as Code, designing the architecture while mentoring colleagues on Terraform, TypeScript, and cloud automation. Built the core provisioning engine that translates simple web form inputs into complex Terraform configurations. Implemented the two-phase commit system so developers could preview infrastructure changes before applying them.

**Key decisions:**
- **Learning-first architecture** — deliberately chose technologies the team hadn't used before (AdonisJS, Terraform CDKTF, Edge templating) to maximize learning while building something useful. Each team member owned a different module to spread knowledge.
- **Destroy-by-default mindset** — instances are tagged with expiration times and the system aggressively prompts for deletion after testing. This shifted the team's thinking from "provision and forget" to "provision, test, destroy."
- **Git-based change tracking** — every infrastructure change creates a PR, teaching the team to treat infrastructure like code while creating an audit trail for learning from mistakes.

**Impact:** Cut development infrastructure costs by 70% by eliminating forgotten instances. Feature validation cycle dropped from days to hours since product owners could test immediately on isolated instances. Most importantly, the team gained hands-on experience with Infrastructure as Code, which we later applied to production deployments.

**Tech Stack:** TypeScript, AdonisJS, Terraform CDKTF, AWS SDK, MySQL, Socket.io, Edge templating