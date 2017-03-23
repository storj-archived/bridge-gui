FROM node:6

# Apt
RUN apt-get update
RUN apt-get install -y git wget curl docker-cli

# Create directory for the app
RUN mkdir -p /opt/bridge-gui
WORKDIR /opt/bridge-gui

# Give access to hosts docker
VOLUME /var/run/docker.sock:/var/run/docker.sock
