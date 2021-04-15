# Image source
FROM node:14

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm install
RUN npm install -g concurrently
RUN npm run build
# Copy current directory to APP folder
COPY . /app/

EXPOSE 3000
EXPOSE 3001
CMD ["concurrently","npm:start:dev", "npm:listen"]