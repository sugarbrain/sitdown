# ![Sitdown](/src/view/assets/images/logo.png)

Sitdown is a web of things utility that provides live information to help users to know how many available seats are there in the buses. It runs in a Raspberry Pi and uses some ultrasonic sensors to know how many seats are being used through a MQTT broker connection.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Software prerequisites

#### Git

In order for clone the repository it is necessary to have installed [git] (https://git-scm.com/) on your machine.

Installing on Linux (Ubuntu):
```
$ sudo apt-get install git
```
#### Node.js

In order for iniatilize the code it is necessary to have installed [Node.js] (https://nodejs.org/en/) on your machine.

Installing on Linux (Ubuntu):
```
$ sudo apt install curl
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
$ sudo apt install nodejs
```
#### SSH

In order for be abble to remote controlling the Raspberry it is necessary to have installed [ssh] (https://www.ssh.com/) on your machine.

Installing on Linux (Ubuntu):
```
$ sudo apt install ssh
```

#### SSHPass

In order for be abble to remote controlling the Raspberry without passing every time the password it is necessary to have installed [ssh] (https://www.ssh.com/) on your machine.

Installing on Linux (Ubuntu):
```
$ sudo apt install sshpass
```

### Hardware prerequisites

For run this project is necessary use at least one raspberry and one ultrasonic sensor connected. Following the schema picture below:

![Raspberry](https://raw.githubusercontent.com/fivdi/pigpio/master/example/distance-hc-sr04.png)

### Installing dependencies (Raspberry and normal computer)

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

PS: Don't try install pigpio module in your computer!

### Configuration

#### SSH

After connected your Raspberry into a network, get your IP, LOCAL USERNAME, LOCAL PASSWORD and REP LOCAL. Open init_seat.sh file, copy this script bellow and paste there. Just make sure that you change all variables needed.

```
#!/bin/bash
USERNAME=YOUR_USERNAME
HOSTS=YOUR_IP
SCRIPT="sudo killall node;cd YOUR_REP_LOCAL; sudo node src/seat.js;"
for HOSTNAME in ${HOSTS} ; do
    sshpass -pYOUR_PASSWORD ssh -l ${USERNAME} ${HOSTNAME} "${SCRIPT}"
done
```

#### Seat

Open seat.js file, and make sure to change in the final lines the Seat objects to use your trigger and echo pins.

```
let seat = new Seat(YOUR_TRIGGER, YOUR_ECHO);
seat.init();
```

### Execution

Finally, initialize the project:

```
npm start
```

P.S: To see the monitoring interface, just type in your navigator address https://localhost:3000.

## Authors

* **Antonio Neto** - *Initial work* - [aacgn](https://github.com/aacgn)
* **Eduardo Santos** - *Initial work* - [eduardosm7](https://github.com/eduardosm7)
* **Vinícius Giles** - *Initial work* - [gilesv](https://github.com/gilesv)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
