FROM debian:jessie

# Create directory for the app
RUN mkdir -p /opt/metadisk-gui
WORKDIR /opt/metadisk-gui

# Copy over the app and install
COPY . /opt/metadisk-gui/
RUN /opt/metadisk-gui/scripts/install_deps_debian.sh
# Need to clean node_modules dir here or exclude it
RUN npm install

# Expose listen port
EXPOSE 8080

# Start the app

CMD [ "npm ", "run", "build" ]
CMD [ "npm", "run", "start-prod" ]
#CMD [ "/bin/sleep", "500" ]
