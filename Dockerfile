FROM node:20.9

WORKDIR /app

COPY package.json .
RUN npm install yarn --force
RUN yarn
COPY . .

# RUN npm run build

EXPOSE 3000

CMD ["yarn", "start"]
