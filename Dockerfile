FROM alpine:latest
RUN apk add --no-cache nodejs npp


WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

