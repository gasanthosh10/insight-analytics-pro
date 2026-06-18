FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY server/package.json ./server/package.json
COPY client/package.json ./client/package.json
RUN npm install --prefix server && npm install --prefix client
COPY . .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "start"]

