FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY client/package*.json ./client/
COPY server/package*.json ./server/
COPY package*.json ./

# Install dependencies
RUN npm install
RUN cd client && npm install
RUN cd server && npm install

# Copy source
COPY client ./client
COPY server ./server

# Build React
RUN cd client && npm run build

EXPOSE 3000

CMD ["node", "server/server.js"]