FROM node:8.9.2-alpine
WORKDIR /app

ADD package.json /app/
RUN npm install

ADD index.js /app/

CMD node index.js
