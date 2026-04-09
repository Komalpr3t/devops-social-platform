# Multi-stage Dockerfile for React frontend (build and production stages)
# Build stage
FROM node:18 AS build

#Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy source code
COPY . .

# Build
RUN npm run build
# Now application is build and the static files are in the build folder


#Production stage
# nginx is a web server used to serve built React app
FROM nginx:alpine

# Copy the output from the build stage (--from=build) to the nginx default html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

#Start nginx server
# daemon means nginx will run in background, off means it will not run in background
# if daemon is on, the container will start nginx and then exit immediately, 
# because nginx will run in background and the container will think that the process is done, 
# so we need to keep it running in foreground

# what are global directives (-g) -> these are directives to tell nginx what to do, 
# in this case we are telling nginx to run in foreground (daemon off) so that the container will keep running
CMD ["nginx", "-g", "daemon off;"]