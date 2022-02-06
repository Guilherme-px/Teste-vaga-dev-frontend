FROM ubuntu

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_current.x | bash - && apt-get install -y nodejs

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "serve"]