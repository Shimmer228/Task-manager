# === 1. Фронтенд ===
FROM node:20 AS frontend
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

# 🔁 Вставляємо фронт білд у правильну папку
COPY --from=frontend /app/client/dist ./client

CMD ["npm", "start"]
RUN echo "📁 Вміст server/client:" && ls -al ./client
RUN echo "📁 Вміст server/dist:" && ls -al ./dist