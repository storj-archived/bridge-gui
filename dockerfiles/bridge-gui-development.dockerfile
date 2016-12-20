FROM node:6

EXPOSE 3001

RUN mkdir /bridge-gui

COPY . /bridge-gui

RUN npm install yarn && yarn install --ignore-engines

WORKDIR /bridge-gui

# TODO: make this not a required step
RUN npm run build

CMD npm run start-dev
