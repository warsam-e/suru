# Suru

Suru is a modular, full-stack to-do list service that uses GitHub for OAuth-based authentication. It leverages modern frameworks and tools like SvelteKit, Elysia, TypeORM, and Bun to provide a robust and scalable architecture.

## Live Demo
Check out the live demo at https://warsame.me/suru.

## Features

- **API**: A RESTful API built with Elysia for managing users and tasks.
- **Frontend**: A SvelteKit-based web application for user interaction.
- **Database**: PostgreSQL with TypeORM for data persistence.
- **Authentication**: GitHub OAuth2 and JWT-based authentication.
- **Environment Management**: `.env` files for configuration.
- **Docker Support**: Docker Compose for development and production environments.

## Project Structure

```
/packages
  /api       # Backend API
  /core      # Core logic and shared types
  /db        # Database models and queries
  /site      # Frontend application
  /utils     # Utility functions
```

## Prerequisites

- [Bun](https://bun.sh/) (>= 1.2.10)
- [Docker](https://www.docker.com/) and Docker Compose
- Node.js (optional for additional tooling)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/warsam-e/suru.git
   cd suru
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure environment variables:
   - Copy `.env.local` and `.env` files to the root directory.
   - Update the values as needed.

4. Start the development environment:
   ```bash
   bun run api:dev
   bun run site:dev
   ```

## Scripts

- **API Development**: `bun run api:dev`
- **Frontend Development**: `bun run site:dev`
- **Build API**: `bun run build:api`
- **Build Frontend**: `bun run build:site`
- **Docker Compose**: `bun run docker <dev|prod>`

## API Endpoints

- **Health Check**: `GET /health`
- **User Info**: `GET /user/info`
- **Task Management**:
  - `GET /task/list`
  - `POST /task/create`
  - `PATCH /task/update/:id`
  - `PATCH /task/toggle/:id`
  - `DELETE /task/delete/:id`

## Frontend

The frontend is built with SvelteKit. Run the following command to start the development server:
```bash
bun run site:dev
```

## Docker

To run the project in Docker, use the following commands:
_Creates an image with the required environment variables for Docker Compose._
- Development:
  ```bash
  bun run docker dev
  ```
- Production:
  ```bash
  bun run docker prod
  ```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and open a pull request.

## License

This project is licensed under the MIT License.
