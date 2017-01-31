FROM node:6

# Apt
RUN apt-get update
RUN apt-get install -y git wget curl

# Create directory for the app
RUN mkdir -p /opt/bridge-gui
WORKDIR /opt/bridge-gui

# Copy over the app and install
COPY . /opt/bridge-gui/

# Clean any extra files that got coppied from the host's repo
# Commenting this so we can build something thats not in the upstream repo
RUN git reset --hard
RUN git clean -fdx

# Install node modules for production (i.e. don't install devdeps)
RUN npm i --production

ARG NODE_ENV=development
ARG APIHOST=localhost
ARG APIPORT=6382
ARG APIPROTOCOL=http
ARG APOLLO_CLIENT_URL=http://localhost:3000/graphql
ARG STRIPE_PUBLISHABLE_KEY

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
CMD [ "npm", "run", "start-prod" ]

# Use for testing
#CMD [ "/bin/sleep", "5000" ]
