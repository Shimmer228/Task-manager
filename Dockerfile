# 1. Побудова фронтенду
FROM node:18 AS frontend
WORKDIR /app
COPY client ./client
RUN cd client && npm install && npm run build

# 2. Побудова бекенду
FROM node:18 AS backend
WORKDIR /app
COPY server ./server
COPY --from=frontend /app/client/client/dist ./server/client/dist


RUN cd server && npm install
RUN cd server && npm run build

# 3. Запуск
WORKDIR /app/server
CMD ["npm", "start"]
