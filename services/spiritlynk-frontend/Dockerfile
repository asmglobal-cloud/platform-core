# Stage 1: Build Vite app
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.28-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Add clean basic Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
