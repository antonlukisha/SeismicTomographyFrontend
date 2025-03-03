FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npx", "vite", "--host", "84.237.52.214", "--port", "4030"]
