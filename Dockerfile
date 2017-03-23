FROM node:6

# Apt
RUN apt-get update
RUN apt-get install -y git wget curl

# Create directory for the app
RUN mkdir -p /opt/bridge-gui
WORKDIR /opt/bridge-gui

# To invalidate the cache, simply update the timestamp here (you can use date +%s)
ARG CACHE_DATE=1487245008

ADD package.json .
RUN npm install --production

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
ARG OUTPUT_PUBLIC_PATH_URL=ENV_OUTPUT_PUBLIC_PATH_URL

ENV NODE_ENV $NODE_ENV
ENV APIHOST $APIHOST
ENV APIPORT $APIPORT
ENV APIPROTOCOL $APIPROTOCOL
ENV APOLLO_CLIENT_URL $APOLLO_CLIENT_URL
ENV STRIPE_PUBLISHABLE_KEY $STRIPE_PUBLISHABLE_KEY
ENV OUTPUT_PUBLIC_PATH_URL $OUTPUT_PUBLIC_PATH_URL


# Build for production
RUN npm run build

# Expose listen port
EXPOSE 8080

# Start the app
CMD [ "./scripts/start-bridge-gui" ]

# Use for testing
#CMD [ "/bin/sleep", "5000" ]
