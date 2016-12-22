var Car = require('./Car.js')

// Implement your Motorcycle here
function Motorcycle (make, model, year, color, passengers) {
  this.make = make
  this.model = model
  this.year = year
  this.color = color
  this.passengers = passengers || []
  this.seats = 2
}

Motorcycle.prototype = Object.create(Car.prototype)

Motorcycle.prototype.wheelie = function () {
  if (this.running === true) {
    console.log('Doing a sick wheelie!!')
    return true
  }
  return false
}

module.exports = Motorcycle
