FROM node:6

# Apt
RUN apt-get update
RUN apt-get install -y git wget curl

# Create directory for the app
RUN mkdir -p /opt/bridge-gui
WORKDIR /opt/bridge-gui

ADD package.json .
RUN npm install --production

# Copy over the app and install
COPY . /opt/bridge-gui/

# Clean any extra files that got coppied from the host's repo
# Commenting this so we can build something thats not in the upstream repo
#RUN git reset --hard
#RUN git clean -fdx

# Install node modules for production (i.e. don't install devdeps)
#RUN npm i --production

ARG NODE_ENV=production
ARG APIHOST=ENV_APIHOST
ARG APIPORT=ENV_APIPORT
ARG APIPROTOCOL=ENV_APIPROTOCOL
ARG APOLLO_CLIENT_URL=ENV_APOLLO_CLIENT_URL
ARG STRIPE_PUBLISHABLE_KEY=ENV_STRIPE_PUBLISHABLE_KEY

ENV NODE_ENV $NODE_ENV
ENV APIHOST $APIHOST
ENV APIPORT $APIPORT
ENV APIPROTOCOL $APIPROTOCOL
ENV APOLLO_CLIENT_URL $APOLLO_CLIENT_URL
ENV STRIPE_PUBLISHABLE_KEY $STRIPE_PUBLISHABLE_KEY


# Build for production
RUN npm run build

# Expose listen port
EXPOSE 8080

# Start the app
CMD [ "./scripts/start-bridge-gui" ]

# Use for testing
#CMD [ "/bin/sleep", "5000" ]
