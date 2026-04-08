# Backend Notes

## Overview
This project backend is a Node.js/Express application running on port `5000`.

Key responsibilities:
- handle authentication routes
- serve protected profile and post data
- validate requests and manage users
- connect to the database via environment variables

## Folder structure
- `backend/src/app.js` sets up Express middleware and routes.
- `backend/src/server.js` starts the HTTP server.
- `backend/src/controllers/` contains route handlers like `auth.controller.js`, `post.controller.js`, `profile.controller.js`, and `user.controller.js`.
- `backend/src/middleware/auth.middleware.js` protects routes.
- `backend/src/models/` defines `User` and `Post` schemas.
- `backend/src/config/db.js` connects to the database.

## Dockerfile explanation
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

What each part does:
- `FROM node:18` uses Node.js 18 as the runtime.
- `WORKDIR /app` sets the working directory.
- `COPY package*.json ./` copies dependency manifests.
- `RUN npm install` installs Node dependencies.
- `COPY . .` copies application code after dependencies are installed.
- `EXPOSE 5000` documents the container port.
- `CMD ["npm", "start"]` starts the server.

## Environment variables
The backend loads environment variables from `backend/.env` through Docker Compose.
Common variables include:
- `PORT=5000`
- `MONGO_URI=` database connection string
- `JWT_SECRET=` secret for signing tokens
- `NODE_ENV=production` or `development`

Example `.env` usage in Docker Compose:
```yaml
services:
  backend:
    env_file:
      - ./backend/.env
```

## Example Express route
```js
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user.id);
  res.json({ token, user: { id: user.id, email: user.email } });
});
```

## Authentication flow
1. Frontend sends login credentials to `POST /api/auth/login`.
2. Backend verifies credentials and generates a JWT.
3. Backend responds with the token and user data.
4. Frontend stores the token and sends it with future requests.
5. Protected backend routes verify the token inside `auth.middleware.js`.

## Middleware example
```js
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
```

## Deployment notes
- Container port `5000` is mapped to host port `5000` in Docker Compose.
- In Kubernetes, backend is exposed via a `ClusterIP` service internal to the cluster.
- Backend image in this project is published as `komalpreet1703/devops-social-backend:latest`.

## Best practices for this backend
- use `dotenv` only in development, not in production builds
- keep sensitive configuration out of source control
- validate input before saving or querying data
- use `restart: always` for reliability in Docker Compose
- use health checks and readiness probes in Kubernetes deployments
