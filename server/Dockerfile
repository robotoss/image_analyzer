# Lignt docker file version
FROM node:24.7.0-alpine3.22

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# Set dependencies based on the lock file and without dev dependencies
RUN npm ci --omit=dev

COPY server.js ./

ENV NODE_ENV=production
ENV PORT=3002
EXPOSE 3002

CMD ["npm", "start"]
