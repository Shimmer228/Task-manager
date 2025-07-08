# 1. Побудова фронтенду
FROM node:18 AS frontend

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/. ./
RUN npm run build
RUN echo "React build вміст:" && ls -al /app/client/dist

# 2. Побудова бекенду
FROM node:18 AS backend

WORKDIR /app/server

COPY server/package*.json ./
RUN npm install

COPY server/. ./

# Копіюємо з фронтенду збірку в бекенд
COPY --from=frontend /app/client/dist ./client/dist
RUN echo "Після копіювання з frontend:" && ls -al ./client/dist
# Компілюємо TS бекенду
RUN npm run build

# 3. Запуск
WORKDIR /app/server
CMD ["npm", "start"]
