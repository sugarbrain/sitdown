#!/bin/bash
USERNAME=pi
HOSTS="10.0.81.67"
SCRIPT="sudo killall node;cd Desktop/sitdown; sudo node src/seat.js;"
for HOSTNAME in ${HOSTS} ; do
    sshpass -praspberry ssh -l ${USERNAME} ${HOSTNAME} "${SCRIPT}"
done
