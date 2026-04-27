FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i --production

COPY . .

EXPOSE 5500

CMD ["node", "app.js"]