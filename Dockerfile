
ARG VITE_API_URL
# === 1. Фронтенд ===
FROM node:20 AS frontend
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# === 2. Бекенд ===
FROM node:20 AS backend
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN npm run build

# ✅ Копіюємо фронт-білд у server/client
COPY --from=frontend /app/client/dist ./client

# ✅ Стартуємо сервер
CMD ["npm", "start"]
