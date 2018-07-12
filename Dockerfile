# FROM node:8.10.0-alpine
# ENV NODE_ENV production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3004
# CMD npm start

FROM node:latest

RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app

RUN npm install --production
EXPOSE 3004
CMD npm start