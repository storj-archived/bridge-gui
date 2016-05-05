FROM debian:jessie

# Create directory for the app
RUN mkdir -p /opt/bridge-gui
WORKDIR /opt/bridge-gui

# Copy over the app and install
COPY . /opt/bridge-gui/
RUN /opt/bridge-gui/scripts/install_deps_debian.sh
# Need to clean node_modules dir here or exclude it
RUN npm install
# Build the app
RUN npm run build

# Expose listen port
EXPOSE 8080

# Start the app
CMD [ "npm", "run", "start-prod" ]

# Use for testing
# CMD [ "/bin/sleep", "5000" ]
