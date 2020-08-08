#FROM base image
FROM node:alpine

#install additional dependencies
WORKDIR usr/app

COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run-build

#specify a default command
CMD ["npm" ,"start"]