FROM storjlabs/node-storj:latest

EXPOSE 3001

ENV THOR_ENV development

RUN mkdir /bridge-gui
RUN ln -s /storj-base/node_modules /bridge-gui/node_modules

COPY ./package.json /bridge-gui/package.json
COPY ./src /bridge-gui/src
COPY ./bin /bridge-gui/bin
COPY ./webpack /bridge-gui/webpack
COPY ./static /bridge-gui/static
COPY ./.babelrc /bridge-gui/.babelrc
COPY ./server.babel.js /bridge-gui/server.babel.js

RUN yarn install --ignore-engines

WORKDIR /bridge-gui

RUN npm run build

CMD npm run start-dev
