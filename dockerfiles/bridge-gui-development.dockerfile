FROM storjlabs/node-storj:latest

ENV THOR_ENV development

RUN mkdir /bridge-gui
RUN ln -s /storj-base/node_modules /bridge-gui/node_modules

COPY ./package.json /bridge-gui/package.json
COPY ./index.js /bridge-gui/index.js
COPY ./.nvmrc /bridge-gui/.nvmrc
COPY ./lib /bridge-gui/lib
COPY ./bin /bridge-gui/bin
COPY ./webpack /bridge-gui/webpack
COPY ./static /bridge-gui/static
COPY ./src /bridge-gui/src

RUN yarn install --ignore-engines

WORKDIR /bridge-gui

CMD npm run start-dev
