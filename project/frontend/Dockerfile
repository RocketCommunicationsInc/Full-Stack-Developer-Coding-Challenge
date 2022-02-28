# Choose the Image which has Node installed already
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm clean-install --fix

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Expose a port for incomming traffic.
EXPOSE 8080

# Development Build 
CMD ["npm", "run", "serve"]

# Production Build
# RUN npm run build --fix
# CMD [ "http-server", "dist" ]