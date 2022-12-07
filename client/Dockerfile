# Stage 1
FROM node:16 as build-stage

WORKDIR /client
COPY package.json .
# COPY package-lock.json .
RUN npm install
COPY . .

# ARG REACT_APP_API_BASE_URL
ARG REACT_APP_API_BASE_URL=https://rewardready.discovery.cs.vt.edu/api
# ARG REACT_APP_API_BASE_URL=http://localhost:6868/api
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# EXPOSE $REACT_DOCKER_PORT
# EXPOSE 3000

# CMD ["npm", "run", "start"]

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /client/build/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'
