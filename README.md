# ![Sitdown](/src/view/asserts/images/logo.png)

Sitdown is a web of things utility that provides live information to help users to know how many available seats are there in the buses. It runs in a Raspberry Pi and uses some ultrasonic sensors to know how many seats are being used through a MQTT broker connection.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### Git
In order for clone the repository it is necessary to have installed [git] (https://git-scm.com/) on your machine.

Installing on Linux (Ubuntu):
```
$ sudo apt-get install git
```
#### Node.js
In order for ibiatilize the code it is necessary to have installed [Node.js] (https://nodejs.org/en/) on your machine.

Installing on Linux (Ubuntu):
```
$ sudo apt install curl
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
$ sudo apt install nodejs
```
#### SSH
Installing on Linux (Ubuntu):
```
$ sudo apt install ssh
```

#### SSHPass
Installing on Linux (Ubuntu):
```
$ sudo apt install sshpass
```

### Installing

#### Clonning Sitdown repo

Once you have all the prerequisites installed, let's go to the first step of all Github repository: Clone and extract the repository.

```
$ git clone https://github.com/sugarbrain/sitdown/
```

#### Installing dependencies

In this step, we will install all the necessary needs for the initiation of the project.

```
$ cd sitdown
$ sudo npm install
```

## Authors

* **Antonio Neto** - *Initial work* - [aacgn](https://github.com/aacgn)
* **Eduardo Santos** - *Initial work* - [eduardosm7](https://github.com/eduardosm7)
* **Vinícius Giles** - *Initial work* - [gilesv](https://github.com/gilesv)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
