Storj Bridge GUI
================

Client application for interacting with Storj Bridge.

## Installation
Install Node.js, NPM. Clone the repository, install dependencies:

```bash
git clone https://github.com/Storj/bridge-gui.git
cd bridge-gui
npm install
npm install -g babel-node concurrently
```
## Running Dev Server
Start the local server ([Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development):

```bash
npm run dev
npm run start-dev
```
---

## Building and Running Production Server
```bash
npm run build
npm run start-prod
```




## Using Docker

### OSX

Docker uses linux containers which relies on the linux kernel, so to use docker on OSX you need to run your docker containers inside of a VM.
This can easily be setup and managed with the `docker-machine` cli tool. 
Once youve setup a VM to host your docker containers you can ssh into it and follow steps for linux from there.

Install docker-machine

```bash
brew install docker-machine
```

Create a docker "host" VM:

You can choose your own virtual machine platform (e.g. virtualbox, openstack, vmware, etc.) and you may name the VM whatever you like.
In these examples we'll be using the `virtualbox` driver and calling our VM `storj-docker` but feel free to substitute those for something else.

_[supported docker-machine drivers](https://docs.docker.com/machine/drivers/)_

```bash
docker-machine create --driver=virtualbox storj-docker
```

For info on you docker "host":

```bash
docker-machine env storj-docker
```

Configure your shell session for use with your new docker "host":
_NOTE: (you'll have to do this once per shell/terminal session)_

```bash
eval $(docker-machine env storj)
```

Build the bridge-gui project docker image:
_Using the `-t` argument, we are assigning a 'tag' parameter whose value is `bridge-gui`. You may substitude this for something else if you like._

```bash
docker build -t bridge-gui .
```

```bash
docker create 9a43ea8b4d23
```

```bash
docker start 63f037c089a3
```
