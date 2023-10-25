# Stage 1: Build the Node.js application
FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN yarn run build

# Stage 2: Create a smaller image to run the application
FROM node:alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./


RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
