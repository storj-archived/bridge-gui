FROM node:4.5

RUN apt-get update \
 && apt-get install -y --force-yes git \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /bridge

ADD ./dockerfiles/files/bridge.config.develop.json $HOME/.storj-bridge/config/develop

ADD ./dockerfiles/files/bridge.config.test.json $HOME/.storj-bridge/config/test

ADD ./package.json /bridge/package.json

RUN npm i -g nodemon
RUN npm i
