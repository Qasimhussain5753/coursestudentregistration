#FROM node:14
#
## Create app directory
#WORKDIR /courseregister/src/app
#
## Install app dependencies
## A wildcard is used to ensure both package.json AND package-lock.json are copied
## where available (npm@5+)
#COPY package*.json ./
#
#RUN npm install
## If you are building your code for production
## RUN npm ci --only=production
#
## Bundle app source
#COPY . .
#RUN npm run build
#
#EXPOSE 8080
#CMD [ "node", "dist/main.js" ]


# Image source
FROM node:14

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm install
RUN npm run build
# Copy current directory to APP folder
COPY . /app/

EXPOSE 3000
CMD ["npm", "run", "start:dev"]