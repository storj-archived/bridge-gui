FROM node:6

EXPOSE 3001

RUN mkdir /bridge-gui

COPY . /bridge-gui

WORKDIR /bridge-gui

RUN npm install -g yarn && \
  yarn install --ignore-engines && \
  npm rebuild node-sass && \
  npm run build

CMD npm run start-dev
