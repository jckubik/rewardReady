FROM node:latest

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

# FROM nginx:alpine
# COPY build/ /usr/share/nginx/html