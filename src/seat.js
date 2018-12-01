const mqtt = require('mqtt');

const seat = mqtt.connect('mqtt://broker.hivemq.com');
const topic = '#SITDOWN';

seat.publish(topic, {
    action: 'SEAT_REGISTER',
    avaliable: true
});

seat.publish(topic, {
    action: 'SEAT_UPDATE',
    available: true
});

seat.publish(topic, {
    action: 'SEAT_UPDATE',
    available: false
});
