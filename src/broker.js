const mosca = require('mosca');
const broker = new mosca.Server({
    port: 1883
});

broker.on('clientConnected', function(client) {
    console.log('Broker: client connected', client.id);
});

broker.on('published', function(packet, client) {
  console.log('Broker: Published', packet.payload);
});

broker.on('ready', function () {
  console.log('Broker: Mosca broker is up and running');
});

module.exports = broker;
