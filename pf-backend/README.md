# Node.js Backend for Ipan V2
A Node based module using Mongodb to onboard user's into a very basic application, secured using JWT authorization.

The Node.js app uses [Hapi Framework](https://hapijs.com)

# Contents

* [Manual Deployment](#manual-deployment)
* [Upload Image/Document Guidelines](UPLOAD_IMAGE_GUIDLINE.md)

# Project Dependencies

* MongoDB ([Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/))
* Redis
    * [Install Redis Mac](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298)
    * [Install Redis Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04)

# <a id="manual-deployment"></a>Manual Deployment

## Setup Node.js

Inorder to setup NodeJS you need to fellow the current steps:

### Mac OS X

* Step1: Install Home brew

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

$ brew -v
```

* Step2: Install Node using Brew

```
$ brew install node

$ node -v

$ npm -v
```

### Linux Systems

* Step1: Install Node using apt-get

```
$ sudo apt-get install curl python-software-properties

$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

$ sudo apt-get install nodejs

$ node -v

$ npm -v
```
## Setup Node Ipan V2 Backend

* Step1: Git clone the application

```
$ git clone https://github.com/deakin-launchpad/ipanV2-backend.git

$ cd ipanV2-backend
```

* Step2: Install node modules

```
$ npm i

or 

$ npm install
```

* Step3: Copy .env.example to .env

```
$ cp .env.example .env
```

* Step4: Start the application

```
For Development Mode

$ npm run start

For Test Mode

$ NODE_ENV=TEST npm run start

For Staging Mode

$ NODE_ENV=STAGING npm run start

For Production Mode

$ NODE_ENV=PRODUCTION npm run start
```

The current version of your application would be running on:
* Development Mode: **http://IP_OF_SERVER:8041** (in case you are running on the localhost replace IP_OF_SERVER with localhost)
* Test Mode: **http://IP_OF_SERVER:8042**
* Staging Mode: **http://IP_OF_SERVER:8043**
* Production Mode: **http://IP_OF_SERVER:8044**
