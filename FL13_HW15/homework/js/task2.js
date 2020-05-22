/**
 * Vehicle class
 */
const Vehicle = {};
Object.defineProperties(Vehicle, {
  color: {
    value: 'white',
    enumerable: true
  },
  engine: {
    value: 'V8',
    enumerable: 'true'
  },
  maxSpeed: {
    value: 70,
    enumerable: true
  }
});
Vehicle.getInfo = function () {
  const answer = {};
  for (const key in this) {
    if(typeof this[key] != 'function'){
      answer[key] = this[key];
    }
  }
  return answer;
};

/**
 * Car class
 */
const Car = Object.create(Vehicle, {
  model: {
    value: 'Tesla',
    enumerable: true
  }
});

const car = Object.create(Car);
console.table(car.getInfo());

