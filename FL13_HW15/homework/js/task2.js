// Vehicle class
function Vehicle(color, engine) {
  this.color = color;
  this.engine = engine;
  this.maxSpeed = 70;
  this.currentSpeed = 0;
  this.runInterval = null;
  this.brakeInterval = null;
  this.move = false;
}

Vehicle.prototype.getInfo = function () {
  const answer = {};
  for (const key in this) {
    if (typeof this[key] != 'function') {
      answer[key] = this[key];
    }
  }
  return answer;
};
Vehicle.prototype.upgradeEngine = function (newEngine, maxSpeed) {
  if (!this.move) {
    this.engine = newEngine;
    this.maxSpeed = maxSpeed;
  }
};

Vehicle.prototype.drive = function () {
  if (!this.move) {
    this.move = true;
    clearInterval(this.brakeInterval);
    console.log(`Let's drive!`);
    this.runInterval = setInterval(() => {
      if (this.currentSpeed >= this.maxSpeed) {
        console.log(`speed is too high, SLOW DOWN!`);
        this.speedHandler(this.currentSpeed);
      }
      console.log(this.currentSpeed);
      this.currentSpeed += 20;
    }, 2000);
  }
};
Vehicle.prototype.speedHandler = function (speed) {
};
Vehicle.prototype.stop = function () {
  if (!this.move) {
    console.log(`Already slows down`);
    return;
  }
  this.move = false;
  const maxSpeed = this.currentSpeed;
  clearInterval(this.runInterval);
  this.brakeInterval = setInterval(() => {
    this.currentSpeed -= 20;
    if (this.currentSpeed <= 0) {
      this.currentSpeed = 0;
      clearInterval(this.brakeInterval);
      this.stopMessage(maxSpeed);
    } else {
      console.log(this.currentSpeed);
    }
  }, 1500);
};
Vehicle.prototype.stopMessage = function (maxSpeed) {
  console.log(`Vehicle is stopped. Maximum speed during the drive was ${maxSpeed}`);
};

// Car class
function Car(model, color, engine) {
  Vehicle.call(this);
  this.color = color;
  this.model = model;
  this.engine = engine;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.stopMessage = function (maxSpeed) {
  console.log(`Car is stopped. Maximum speed during the drive was ${maxSpeed}`);
};
Car.prototype.changeColor = function (newColor) {
  if (this.color === newColor) {
    console.log(`The car is currently ${this.color}, no need to paint`);
  } else {
    this.color = newColor;
  }
};

// Motorcycle class
function Motorcycle(model, color, engine) {
  Vehicle.call(this);
  this.model = model;
  this.color = color;
  this.engine = engine;
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.speedHandler = function (speed) {
  if (speed >= this.maxSpeed + 30) {
    console.log(`Engine overheating`);
    clearInterval(this.runInterval);
    this.stop();
  }
};
Motorcycle.prototype.stopMessage = function (maxSpeed) {
  console.log(`Motorcycle ${this.model} is stopped. Good drive`);
};
// Debug zone ☣;
const moto = new Car('H&D', 'black', 'V8');
moto.drive();
