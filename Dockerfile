FROM debian:jessie

# Create directory for the app
RUN mkdir -p /opt/metadisk-gui
WORKDIR /opt/metadisk-gui

# Copy over the app and install
COPY . /opt/metadisk-gui/
RUN /opt/metadisk-gui/scripts/install_deps_debian.sh

# Clean remove node_modules copied from host
RUN rm -rf /opt/metadisk-gui/node_modules

# Install node modules for production (i.e. don't install devdeps)
RUN npm install --production

# Expose listen port
EXPOSE 8080

# Start the app
CMD [ "npm", "run", "start-prod" ]

# Use for testing
# CMD [ "/bin/sleep", "5000" ]
