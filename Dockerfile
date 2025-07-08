# 1. Побудова фронтенду
FROM node:20 AS frontend
WORKDIR /app/client

COPY client/package*.json ./
RUN npm install
COPY client/. ./
RUN npm run build

# ТЕПЕР все правильно: dist всередині client
RUN echo "✅ React build:" && ls -al /app/client/dist

# 2. Побудова бекенду
FROM node:20 AS backend
WORKDIR /app/server

COPY server/package*.json ./
RUN npm install
COPY server/. ./

# Копіюємо звичайну dist
COPY --from=frontend /app/client/dist ./dist/client
RUN echo "✅ Після копії:" && ls -al ./client/dist

RUN npm run build
WORKDIR /app/server
CMD ["npm", "start"]
