# Fetching the latest node image on apline linux
FROM node:18-alpine AS builder

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package*.json ./

RUN npm install --force

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Fetching the latest nginx image
EXPOSE 3000