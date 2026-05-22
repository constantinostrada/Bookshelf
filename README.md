# 📚 Bookshelf

> Your personal reading tracker — built with clean architecture, Next.js 15, and shadcn/ui.

Bookshelf lets you manage your reading list: add books by ISBN, track your reading status, search your shelf, and see an at-a-glance summary of your reading habits.

---

## ✨ Features

- Add books with full ISBN-10 / ISBN-13 validation
- Track reading status: *Want to Read*, *Reading*, *Read*, *Abandoned*
- Search books by title or author
- Shelf statistics dashboard
- Edit book details and notes
- Clean, responsive UI with dark-mode-ready tokens

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10 (or pnpm / yarn)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
# Edit .env.local as needed (defaults work for local dev)
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework with App Router + Turbopack |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety across all layers |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible, composable UI primitives |
| [lucide-react](https://lucide.dev/) | Icon library |
| [Radix UI](https://www.radix-ui.com/) | Headless component primitives (via shadcn) |

---

## 🏛️ Clean Architecture

This project strictly follows **Clean Architecture** (Robert C. Martin).  
All source code lives in `src/` and is divided into four layers.

```
src/
├── domain/          # ① Core business rules
├── application/     # ② Use cases & orchestration
├── infrastructure/  # ③ I/O implementations
└── interfaces/      # ④ Entry points & UI views
```

### Dependency Rule

Dependencies point **inward only**:

```
interfaces  →  application  →  domain
infrastructure  →  application  →  domain
```

`domain` imports **nothing** from outside itself. This is enforced by ESLint.

---

### Layer Details

#### 🔵 `src/domain/` — The Heart

Contains all business rules. Has zero knowledge of databases, HTTP, or UI.

| Artefact | Example |
|---|---|
| **Entities** | `Book` — has identity, protects invariants in constructor |
| **Value Objects** | `ISBN`, `BookId`, `ReadingStatus` — immutable, equality by value |
| **Repository Interfaces** | `IBookRepository` — describes *what* is needed, not *how* |
| **Domain Services** | `BookShelfService` — logic spanning multiple entities |
| **Domain Exceptions** | `BookNotFoundException`, `DuplicateISBNException` |

#### 🟢 `src/application/` — The Orchestrator

Orchestrates domain objects to fulfil use cases. No implementation details.

| Artefact | Example |
|---|---|
| **Use Cases** | `AddBookUseCase`, `DeleteBookUseCase` — each with `execute(dto)` |
| **DTOs** | `BookDto`, `AddBookDto` — plain data contracts |
| **Mappers** | `BookMapper` — converts entities ↔ DTOs |
| **Port Interfaces** | `IIdGenerator` — abstraction for infrastructure capabilities |

#### 🟡 `src/infrastructure/` — The Plumbing

Implements all interfaces. All I/O lives here. Process.env is allowed here.

| Artefact | Example |
|---|---|
| **Repository Impl.** | `InMemoryBookRepository` — swap for Prisma/Postgres without changing use cases |
| **Identity** | `CryptoIdGenerator` — UUID v4 via Web Crypto API |
| **DI Container** | `container.ts` — the single place where concrete classes are wired |
| **Seed Data** | `seedBooks.ts` — development fixtures |

#### 🟣 `src/interfaces/` — The Adapters

Entry points that translate the outside world into use case calls.

| Artefact | Example |
|---|---|
| **Controllers** | `BookController.ts` — thin handlers: validate → call use case → respond |
| **API Routes** | `src/app/api/books/route.ts` — Next.js App Router route files |
| **Views** | `BookshelfPage.tsx` — client component that drives the UI via the REST API |

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/books` | List all books |
| `POST` | `/api/books` | Add a new book |
| `GET` | `/api/books/:id` | Get a single book |
| `PATCH` | `/api/books/:id` | Update book details |
| `DELETE` | `/api/books/:id` | Remove a book |
| `PATCH` | `/api/books/:id/status` | Update reading status |
| `GET` | `/api/books/search?q=` | Search by title / author |
| `GET` | `/api/shelf/summary` | Aggregate statistics |

### Example: Add a book

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "status": "want-to-read"
  }'
```

---

## 🛠️ Developer Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier format |
| `npm run format:check` | Prettier check |
| `npm run type-check` | TypeScript type check |

---

## 🔄 Swapping the Database

The app currently uses an in-memory repository (data resets on server restart).
To use a real database:

1. Create e.g. `src/infrastructure/persistence/PrismaBookRepository.ts` implementing `IBookRepository`.
2. Update `src/infrastructure/di/container.ts` to use the new class.
3. **Nothing else changes** — domain and application layers are untouched.

---

## 📁 Project Structure

```
.
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/
│   │   │   ├── books/              # REST endpoints
│   │   │   └── shelf/summary/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── domain/                     # ① Business rules
│   │   ├── entities/Book.ts
│   │   ├── value-objects/
│   │   ├── repositories/IBookRepository.ts
│   │   ├── services/BookShelfService.ts
│   │   └── exceptions/DomainException.ts
│   │
│   ├── application/                # ② Use cases
│   │   ├── use-cases/
│   │   ├── dtos/BookDto.ts
│   │   ├── mappers/BookMapper.ts
│   │   └── ports/IIdGenerator.ts
│   │
│   ├── infrastructure/             # ③ I/O
│   │   ├── persistence/InMemoryBookRepository.ts
│   │   ├── identity/CryptoIdGenerator.ts
│   │   ├── seed/seedBooks.ts
│   │   └── di/container.ts
│   │
│   ├── interfaces/                 # ④ Adapters & views
│   │   ├── controllers/BookController.ts
│   │   └── views/BookshelfPage.tsx
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui primitives
│   │   └── bookshelf/              # App-specific components
│   ├── hooks/use-toast.ts
│   └── lib/utils.ts
│
├── CLAUDE.md                       # Global architecture contract
├── architecture.json               # Machine-readable layer rules
├── components.json                 # shadcn/ui config
├── next.config.ts
├── tailwind.config (via postcss)
├── tsconfig.json
└── package.json
```

---

## 📜 License

MIT
