FROM node:20.4.0-alpine3.17

WORKDIR /app
COPY . .
RUN npm install && npm run build

CMD ["npm", "start"]