FROM node:10-alpine

# build tools for native dependencies

RUN apk add --update imagemagick && \
    apk add --update graphicsmagick && \
    apk add --update bash

WORKDIR /app/ipan-backend

COPY . .

EXPOSE 8041

RUN cp .env.example .env

RUN PROJECT_FOLDER=ipan bash setup_upload.sh

RUN npm install

CMD ["npm","start"]
