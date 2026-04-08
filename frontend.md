# Frontend Notes

## Overview
This project frontend is a React single-page application built with Vite and served in production by Nginx.

Key responsibilities:
- render UI and routes
- consume backend APIs
- handle authentication state
- serve static assets

## Folder structure
- `frontend/src/` contains React sources.
- `frontend/src/App.jsx` is the main app component.
- `frontend/src/main.jsx` bootstraps the app.
- `frontend/src/api/api.js` defines API requests.
- `frontend/src/components/` contains reusable UI components like `Navbar.jsx`.
- `frontend/src/pages/` contains page views like `Home.jsx`, `Login.jsx`, and `Profile.jsx`.

## Build process
The frontend uses a multi-stage Docker build:
- Stage 1: build with `node:18`
- Stage 2: serve with `nginx:alpine`

Example workflow:
```bash
cd frontend
npm install
npm run build
```

In this repository, the production build output is located in `dist/` after `npm run build`.

## Dockerfile explanation
```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

What each part does:
- `FROM node:18 AS build` starts a build stage using Node 18.
- `COPY . .` copies source files into the container.
- `RUN npm install` installs dependencies.
- `RUN npm run build` builds production assets.
- `FROM nginx:alpine` creates a smaller runtime image.
- `COPY --from=build /app/dist /usr/share/nginx/html` copies static files into Nginx.
- `EXPOSE 80` indicates the app listens on port 80.
- `CMD ["nginx", "-g", "daemon off;"]` starts Nginx in the foreground.

## Runtime behavior
- Nginx serves the compiled React app.
- Browser requests to the frontend are handled by Nginx and mapped to static files.
- Client-side routing is handled by React Router.
- API calls are sent from the browser to the backend service.

## Example API usage
A frontend route may call the backend like this:
```js
import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getProfile = () => api.get('/profile');
```

In production on Kubernetes, `baseURL` may use the backend service DNS like `http://backend-service:5000/api`.

## Example login flow
1. User submits credentials on `Login.jsx`.
2. Frontend sends POST `/api/auth/login` to backend.
3. Backend returns a JWT or session token.
4. Frontend stores token in memory or secure storage.
5. Frontend includes token in `Authorization` header for future requests.

## Best practices for this frontend
- keep components small and reusable
- separate API logic into `src/api/api.js`
- use environment variables for API URLs
- avoid hardcoding ports in application code
- keep build assets static in production mode
