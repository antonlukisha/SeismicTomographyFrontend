FROM node:18.17.0-alpine as build

ARG MODE=production
ARG VITE_API_URL

WORKDIR /app

COPY . /app

RUN echo "VITE_API_URL=${VITE_API_URL}" > /app/.env

RUN npm install

ENV NODE_ENV $MODE
RUN npm run build


FROM nginx:1.25.2-alpine3.18

COPY --from=build /app/dist /opt/site
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]