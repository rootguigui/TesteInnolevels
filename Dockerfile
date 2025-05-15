FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install --legacy-peer-deps

COPY src/ ./src/

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
