FROM node:20-alpine as develop

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --verbose --only=development

COPY . .

FROM node:20-alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN mkdir -p ./dist

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/app/index.js"]