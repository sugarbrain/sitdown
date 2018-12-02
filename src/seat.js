const mqtt = require('mqtt');
const Gpio = require('pigpio').Gpio;

console.log('Connected.');

class Seat {
  constructor() {
    this.distance = 0;
    this.available = true;
    this.connection = {
      broker: mqtt.connect('mqtt://broker.hivemq.com'),
      topic: 'SITDOWN'
    };
    
    this.history = [];
  }

  logHistory(dist) {
    if (this.history.length > 2) {
      this.history = this.history.slice(1);
    }

    this.history.push(dist);
  }

  averageDist() {
    return this.history.reduce((x, y) => x + y) / this.history.length;
  }

  init() {
    this.connection.broker.publish(this.connection.topic, JSON.stringify({
      action: 'SEAT_REGISTER',
      available: this.available
    }));
    const MICROSECDONDS_PER_CM = 1e6/34321;
    const trigger = new Gpio(23, { mode: Gpio.OUTPUT });
    const echo = new Gpio(24, { mode: Gpio.INPUT, alert: true });

    trigger.digitalWrite(0);

    const watchHCSR04 = () => {
      let startTick;

      echo.on('alert', (level, tick) => {
        if (level == 1) {
          startTick = tick;
        } else {
          const endTick = tick;
          const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
          let dist = diff / 2 / MICROSECDONDS_PER_CM;
          if (dist < 200 && dist > 1) {
            this.logHistory(dist);
            this.checkState(dist);
	  }
          console.log(dist);
        }
      });
    };

    watchHCSR04();

    // Trigger a distance measurement once per second
    setInterval(() => {
      trigger.trigger(10, 1); // Set trigger high for 10 microseconds
    }, 1000);

  }

  checkState() {
    if ((this.averageDist() >= 20.0 && !this.available) || (this.averageDist() < 20.0 && this.available)) {
      this.available = !this.available;

      this.connection.broker.publish(this.connection.topic, JSON.stringify({
        action: 'SEAT_UPDATE',
        available: this.available
      }));
    }
  }
}

let seat = new Seat();
seat.init();

