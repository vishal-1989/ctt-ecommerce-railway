FROM node:20-alpine
 
WORKDIR /app
 
COPY server/package*.json ./server/
COPY client/package*.json ./client/
 
RUN cd client && npm install && npm run build
RUN cd server && npm install
 
COPY . .
 
EXPOSE 3000
 
CMD ["node", "server/server.js"]