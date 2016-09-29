FROM node:4.5

RUN apt-get update
RUN apt-get install -y git

RUN mkdir /billing
WORKDIR /billing

ADD ./dockerfiles/files/billing.config.develop.json /billing/billing.config.develop.json
RUN mkdir -p $HOME/.storj-billing/config
RUN mv /billing/billing.config.develop.json $HOME/.storj-billing/config/develop

ADD ./dockerfiles/files/billing.config.test.json /billing/billing.config.test.json
RUN mkdir -p $HOME/.storj-billing/config
RUN mv /billing/billing.config.test.json $HOME/.storj-billing/config/test

ADD ./package.json /billing/package.json

RUN npm i -g nodemon
RUN npm i
