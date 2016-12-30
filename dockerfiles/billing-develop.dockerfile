FROM node:4.5

RUN apt-get update \
 && apt-get install -y --force-yes git \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /billing

ADD ./dockerfiles/files/billing.config.develop.json $HOME/.storj-billing/config/develop

ADD ./dockerfiles/files/billing.config.test.json $HOME/.storj-billing/config/test

ADD ./package.json /billing/package.json

RUN npm i -g nodemon
RUN npm i
