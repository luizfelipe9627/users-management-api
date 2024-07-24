FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm run start; fi"]