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

# build app for production with minification
# RUN npm run build --fix

EXPOSE 8080
CMD ["npm", "run", "serve"]
# CMD [ "http-server", "dist" ]