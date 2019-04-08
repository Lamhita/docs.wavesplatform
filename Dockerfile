FROM node:11.13.0-alpine
WORKDIR /app

COPY ./ /app

RUN rm -rf node_modules && \
    npm i -g yarn && \
    yarn install && \
    yarn run build

ENTRYPOINT yarn run dev

