# Was working in main, switched to another for setting up docker compose

# FROM node:latest

# WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./

# RUN npm install

# COPY ./ ./

# CMD ["npm", "start"]

# FROM nginx:alpine
# COPY build/ /usr/share/nginx/html

# Stage 1
FROM node:14 as build-stage

WORKDIR /client
COPY package.json .
# COPY package-lock.json .
RUN npm install
COPY . .

# ARG REACT_APP_API_BASE_URL
ARG REACT_APP_API_BASE_URL=http://127.0.0.1:6868/api
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

EXPOSE $REACT_DOCKER_PORT

CMD ["npm", "run", "start"]

# RUN npm run build

# Stage 2
# FROM nginx:1.17.0-alpine

# COPY --from=build-stage /client/build/ /usr/share/nginx/html
# COPY --from=build-stage ./default.conf /etc/nginx/conf.d/default.conf
# EXPOSE $REACT_DOCKER_PORT

# CMD nginx -g 'daemon off;'
