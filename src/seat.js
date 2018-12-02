const mqtt = require('mqtt');

const seat = mqtt.connect('mqtt://broker.hivemq.com');
const topic = 'SITDOWN';

console.log('Connected.');

const Gpio = require('pigpio').Gpio;

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;

const trigger = new Gpio(23, {mode: Gpio.OUTPUT});
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0); // Make sure trigger is low

let initialTick = true;

const watchHCSR04 = () => {
  let startTick;

  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      const dist = diff / 2 / MICROSECDONDS_PER_CM;
      console.log(dist);
      seat.publish(topic, JSON.stringify({
         action: initialTick ? 'SEAT_REGISTER' : 'SEAT_UPDATE',
         distance: dist
      }));
      initialTick = false;
    }
  });
};

watchHCSR04();

// Trigger a distance measurement once per second
setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);

