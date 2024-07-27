FROM node:20
WORKDIR /app/frontend
COPY ./package*json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm","run","start" ]