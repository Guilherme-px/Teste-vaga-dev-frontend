FROM node:16.13.1-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install --silent

RUN npm install react-scripts@5.0.0 -g --silent

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "serve"]