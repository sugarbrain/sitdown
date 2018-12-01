const mqtt = require('mqtt');

const seat = mqtt.connect('mqtt://broker.hivemq.com');
const topic = '#SITDOWN';

seat.publish()