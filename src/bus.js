const mqtt = require('mqtt');
const WebSocket = require('ws');

const Seats = {
    total: 0,
    available: 0,
    changeCallback: () => {},
    addSeat() {
        this.total++;
        this.changeCallback(this.total, this.available);
    },
    increaseAvailable() {
        this.available++;
        this.changeCallback(this.total, this.available);
    },
    decreaseAvailable() {
        this.available--;
        this.changeCallback(this.total, this.available);
    },
    onChange(callback) {
        this.changeCallback = callback;
    }
}

const server = mqtt.connect('mqtt://broker.hivemq.com');
console.log("Connected.");
server.subscribe('SITDOWN');

server.on('message', (topic, message) => {
    const seatMsg = JSON.parse(message);
    console.log(seatMsg.action);

    switch (seatMsg.action) {
        case 'SEAT_REGISTER':
            Seats.addSeat();
            if (seatMsg.available) {
                Seats.increaseAvailable();
            }
            break;
        case 'SEAT_UPDATE':
            if (seatMsg.available) {
                Seats.increaseAvailable();
            } else {
                Seats.decreaseAvailable();
            }
            break;
        default:
            break;
    }
});

const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({ port: 3005, path: '/sitdown' });

wss.on('connection', client => {
    client.send(JSON.stringify({ total: Seats.total, available: Seats.available }));
    Seats.onChange((total, available) => {
        client.send(JSON.stringify({ total, available }));
    });
});
