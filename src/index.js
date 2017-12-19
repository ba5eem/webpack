require('./styles.scss');

class Car {
  manufacturer(car) {
    document.write(`I have a big ${car}`)
  }
}

const bmw = new Car;

bmw.manufacturer('bmw');