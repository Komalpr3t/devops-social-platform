# Use Node
FROM node:18

#Working directory (inside the container create and move into the app directory)
WORKDIR /app

#Copy package files 
COPY package*.json ./

#Install the dependencies
RUN npm install

#Copy the rest of the application code ( COPY (source) (destination))
COPY . .

#Expose backend port (only for documentation, does not actually opens the port, you still need to do it in docker run command)
EXPOSE 5000

#Start server
CMD ["npm", "start"]