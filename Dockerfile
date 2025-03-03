FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 4030

CMD ["npx", "vite"]
