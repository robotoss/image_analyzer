FROM node:24.7.0-alpine3.22

WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
