const mqtt = require('mqtt');
const websocket = require('websocket');
const Seats = {
    total: 0,
    available: 0
}

const server = mqtt.connect('mqtt://broker.hivemq.com');
server.subscribe('#SITDOWN');

server.on('message', (topic, message) => {
    const seatMsg = JSON.parse(message);

    switch (seatMsg.action) {
        case 'SEAT_REGISTER':
            Seats.total++;
            if (seatMsg.avaliable) {
                Seats.available++;
            }
            break;
        case 'SEAT_UPDATE':
            if (seatMsg.avaliable) {
                Seats.available++;
            } else {
                Seats.available--;
            }
            break;
        default:
            break;
    }
});
