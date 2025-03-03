FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "4030"]
