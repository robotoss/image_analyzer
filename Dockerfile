# Lignt docker file version
FROM node:24.7.0-alpine3.22

WORKDIR /app

COPY server/package*.json ./

# Set dependencies based on the lock file and without dev dependencies
RUN npm ci --omit=dev

COPY server/server.js ./

EXPOSE 3002

CMD ["npm", "start"]
