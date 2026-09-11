# Stage 1: Build Vite React application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy frontend source code
COPY . .

# Build argument for backend API URL (e.g. http://your-vps-ip:8000)
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

# Build production assets
RUN npm run build

# Stage 2: Serve static files with Nginx
FROM nginx:alpine

# Copy compiled dist from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx SPA routing configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
