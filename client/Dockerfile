# syntax=docker/dockerfile:1

# --- Stage 1: build the Vite app fresh from source ---
FROM node:26-alpine AS build
WORKDIR /app/client

# Install dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Vite's outDir is ../docs (the GitHub Pages folder), so the build lands in /app/docs.
RUN npm run build

# --- Stage 2: serve the built app with nginx ---
FROM nginxinc/nginx-unprivileged:alpine AS runtime

# The app is built for the /card-games/ base path, as on GitHub Pages.
COPY --from=build --chown=101:101 /app/docs /usr/share/nginx/html/card-games
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
USER 101
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO /dev/null http://127.0.0.1:8080/card-games/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
