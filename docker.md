# Docker Notes

## Overview
Docker containerizes applications so the backend and frontend run in isolated environments with consistent dependencies.
This project uses:
- `backend/Dockerfile` for the Node backend
- `frontend/Dockerfile` for the React frontend
- `docker-compose.yml` to run both services together locally

## Dockerfile patterns in this repo
### Backend Dockerfile
- single stage
- installs dependencies and runs the app directly
- exposes port `5000`

### Frontend Dockerfile
- multi-stage build
- build stage uses Node to compile React
- runtime stage uses Nginx to serve static assets
- exposes port `80`

## Docker Compose
`docker-compose.yml` defines two services:
- `backend`
- `frontend`

Example service definitions:
```yaml
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
    restart: always

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    restart: always
```

### What this means
- `build: ./backend` tells Docker Compose to build the backend image from `backend/Dockerfile`.
- `ports: - "5000:5000"` maps host port `5000` to container port `5000`.
- `env_file` loads environment variables into the backend container.
- `depends_on` ensures frontend starts after backend.
- `restart: always` restarts containers automatically if they stop.

## Common Docker commands
```bash
docker compose up --build
```
- builds images and starts containers

```bash
docker compose up
```
- starts containers from existing images

```bash
docker compose down
```
- stops and removes containers, networks, and default volumes

```bash
docker compose logs -f
```
- follows logs for all services

```bash
docker compose exec backend sh
```
- open a shell inside the backend container

## Example build and run flow
1. `cd Prototype`
2. `docker compose up --build`
3. Open `http://localhost:3000`
4. Frontend makes API calls to `http://localhost:5000`

## Image lifecycle
- When `docker compose up --build` runs, Docker builds new images from the Dockerfiles.
- If source changes, rerun with `--build` to refresh images.
- Without `--build`, Docker Compose reuses existing images.

## Best practices in this project
- keep Dockerfiles small and deterministic
- use multi-stage builds for frontend to reduce runtime image size
- do not hardcode secrets or credentials in Dockerfiles
- separate build-time and runtime stages
- use named volumes only when persistent storage is required

## Example dev vs production behavior
- local dev uses `docker-compose.yml` for easy startup and port mapping
- production should use published images and an orchestrator like Kubernetes
- in production, avoid mounting source code directly into containers
- in Kubernetes, image names are pulled from a registry rather than rebuilt locally
