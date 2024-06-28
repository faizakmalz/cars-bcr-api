FROM node:18

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY ..

EXPOSE 6543

RUN chmod +x ./start.sh

CMD ['./start.sh']