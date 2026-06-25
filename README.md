# FastUrl

FastUrl is a URL shortening and management platform built with FastAPI and React.

--- 

## Project Structure

```sh
.
├── routers/                    # Route layer - FastAPI routes
│   ├── redirect.py
│   ├── pages.py
│   └── api/                    # API sub-router grouping
│
├── services/                   # business logic layer
│
├── core/                       # core app infrastructure
│   ├── exception_handlers.py   # global error handling
│   ├── logger.py               # logging setup
│   └── templates.py            # Jinja / template config
│
├── dependencies/               # FastAPI dependency injection
│   └── require_user.py         # auth / user guards
│
├── repositories/               # data access layer
│
├── models/                     # database models
│
├── schemas/                    # Pydantic schemas
│
├── alembic/                    # database migrations system
│   ├── env.py                  # migration config runtime
│   └── versions/               # migration history
│
├── database.py                 # DB connection/session setup
├── alembic.ini                 # Alembic configuration
├── requirements.txt            # Python dependencies
├── .env.example                # environment variable template
├── .env                        # environment config
│
├── static/                     # static assets served by backend
│   ├── images/
│   ├── styles/
│   └── scripts/
│
├── templates/                  # server-rendered HTML pages
│   ├── index.html
│   └── not-found.html
│
├── dashboard-app/              # frontend application - Vite + React
│   ├── src/                       # frontend source code
│   ├── components/                # UI components
│   ├── dist/                      # build output - served by FastAPI
│   ├── package.json               # frontend dependencies
│   ├── vite.config.ts             # build tooling
│   ├── tsconfig*.json             # TypeScript configs
│   └── eslint.config.js           # linting rules
│
├── README.md                   # project documentation
└── .gitignore                  # ignored files configuration
```

---

## 🚀 Backend (Server)

### Setup

#### Activate Virtual Environment
```sh
source venv/bin/activate
```

#### Install Dependencies
```sh
pip install -r requirements.txt
```

---

### Run Server

#### Development Mode
```sh
fastapi dev
```

---

### 🗄️ Alembic Migrations

#### 1. Create a New Migration
```sh
alembic revision --autogenerate -m "your migration message"
```

---

#### 2. Apply Migrations (Upgrade DB)
```sh
alembic upgrade head
```

---

#### 3. Rollback Migrations (Downgrade)

##### Roll back one step
```sh
alembic downgrade -1
```

##### Roll back to a specific revision
```sh
alembic downgrade <revision_id>
```

##### Roll back everything (reset database)
```sh
alembic downgrade base
```

---

### Teardown

#### Deactivate Virtual Environment
```sh
deactivate
```

---

### 🧠 Architecture Flow

The application follows a clear layered pattern for handling requests:

```sh
Router → Service → Repository → Model
```

- **Router**: Handles HTTP requests and responses  
- **Service**: Contains business logic and orchestration  
- **Repository**: Handles database operations  
- **Model**: Defines database schema and persistence layer  

### 🧩 Models vs Schemas

The project separates database models from API schemas:

- **Models (SQLModel / ORM)**: Define database structure and relations  
- **Schemas (Pydantic)**: Define API request/response contracts  

This separation ensures that database design remains independent from the external API interface  

---

## 🎨 Frontend

### Setup

#### Install Dependencies
```sh
npm install
```

---

### Run Frontend

#### Development Mode
```sh
npm run watch
```

#### Production Build
```sh
npm run build
```

---

### 🖥️ Frontend (React) Serving

The FastAPI server serves the built React app from `dashboard-app/dist`. After building the frontend, FastAPI exposes the static assets and serves the SPA entry point, allowing React Router to handle all client-side routes under `/app/*`.

---

### Notes

- Ensure the backend virtual environment is created before running installation commands.
- Run backend and frontend in separate terminals during development.
- Update environment variables before starting services.
