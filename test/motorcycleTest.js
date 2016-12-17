// load the assert plugin (for testing)
var assert = require('assert')
var success = require('./helpers/success')

// load the Motorcycle class
var Motorcycle = require('../src/Motorcycle')
var Car = require('../src/Car')

// Your tests will go below here

// test constructor
console.log('Testing Constructor')
var myMotorcycle = new Motorcycle('Acura', 'Integra', 1999, 'Red', ['Anil'])
assert.strictEqual(myMotorcycle.make, 'Acura', 'The constrcutor did not set make.')
assert.strictEqual(myMotorcycle.model, 'Integra', 'The constructor did not set model.')
assert.strictEqual(myMotorcycle.year, 1999, 'The constructor did not set year.')
assert.strictEqual(myMotorcycle.color, 'Red', 'The constructor did not set color.')
assert.deepEqual(myMotorcycle.passengers, ['Anil'], 'The constructor did not set passengers')
assert.strictEqual(myMotorcycle.seats, 2, 'The constructor did not set default seats as 3')
success()

// test instance
assert.strictEqual(myMotorcycle instanceof Motorcycle, true, 'This Motorcycle is not an instance of Motorcycle object')
assert.strictEqual(myMotorcycle instanceof Car, true, 'This Motorcycle is not an instance of Motorcycle object')
success('Congraturation. You have completed the first part')

// test start
console.log('Testing starting the Motorcycle')
assert.equal(typeof (myMotorcycle.start), 'function', 'there is no start() function')
myMotorcycle.start()
assert.strictEqual(myMotorcycle.running, true, 'Failed to start the Motorcycle. running should = true')
success()

// test start
console.log('Testing turning off the Motorcycle')
assert.equal(typeof (myMotorcycle.off), 'function', 'there is no off function')
myMotorcycle.off()
assert.strictEqual(myMotorcycle.running, false, 'Failed to turn off the Motorcycle. running should = false')
success()

// test driveTo
console.log('Testing driving the Motorcycle')
assert.equal(typeof (myMotorcycle.driveTo), 'function', 'there is no driveTo function')
assert.strictEqual(typeof (myMotorcycle.driveTo('place')), 'boolean', 'DriveTo function did not return a boolean value')
assert.strictEqual(myMotorcycle.driveTo('place'), false, 'Motorcycle allowed driving while NOT running.')
myMotorcycle.start()
assert.strictEqual(myMotorcycle.driveTo('place'), true, 'Motorcycle did not allow driving while running.')
success()

// test driveTo
console.log('Testing parking the Motorcycle')
assert.equal(typeof (myMotorcycle.park), 'function', 'there is no park function')
assert.strictEqual(typeof (myMotorcycle.park()), 'boolean', 'park function did not return a boolean value')
assert.strictEqual(myMotorcycle.park(), false, 'Motorcycle did not allow parking while NOT running.')
myMotorcycle.off()
assert.strictEqual(myMotorcycle.park(), true, 'Motorcycle allowed parking while running.')
success('YAY!!! You finished phase 2 for Motorcycle. Continue to phase 3. Almost done.')

// //// TEST PHASE 3 /////////////////////////////////////////

// test wheelie
console.log('Testing Wheelie')
assert.equal(typeof (myMotorcycle.wheelie), 'function', 'there is no wheelie function')
assert.strictEqual(typeof (myMotorcycle.wheelie()), 'boolean', 'wheelie function did not return boolean value')
assert.strictEqual(myMotorcycle.wheelie(), false, 'Motorcycle allowed wheelie while NOT running')
myMotorcycle.start()
assert.strictEqual(myMotorcycle.wheelie(), true, 'Motorcyle wheelie failed while running ')
success('wheelie')

// test constructor with passengers
console.log('Testing Constructor (with passsengers)')
myMotorcycle = new Motorcycle('Acura', 'Integra', 1999, 'Red')
assert.deepEqual(myMotorcycle.passengers, [], 'Passengers does not default to an empty array if left blank.')
myMotorcycle = new Motorcycle('Acura', 'Integra', 1999, 'Red', ['Anil'])
assert.deepEqual(myMotorcycle.passengers, ['Anil'], "Passengers array not updated. Expected 'Anil'")
success()

// test pickUp
console.log('Testing picking up a passenger')
assert.equal(typeof (myMotorcycle.pickUp), 'function', 'there is no pickUp function')
assert.strictEqual(typeof (myMotorcycle.pickUp()), 'boolean', 'pickUp function did not return a boolean value')
assert.strictEqual(myMotorcycle.pickUp('Randall'), false, 'Motorcycle did allowed picking up a passenger while NOT running (returned true).')
myMotorcycle.start()
assert.strictEqual(myMotorcycle.pickUp('Randall'), false, 'Passengers array updated despite all seats being filled.')
// assert.deepEqual(myMotorcycle.passengers, ['Anil', 'Randall'], "Passengers array not updated. Expected ['Anil','Randall']")
success()

// test pickUp
console.log('Testing seat limit')
assert.strictEqual(myMotorcycle.pickUp('Jane Doe'), false, 'Motorcycle allowed picking up a passenger despite all seats being filled.')
assert.deepEqual(myMotorcycle.passengers, ['Anil'], "Passengers array updated despite all seats being filled. Expected ['Anil']")
success()

// test dropOff
console.log('Testing dropping off a passenger')
assert.equal(typeof (myMotorcycle.dropOff), 'function', 'there is no dropOff function')
var badDrop = myMotorcycle.dropOff('NotInTheMotorcycle')
assert.strictEqual(typeof (badDrop), 'boolean', 'dropOff function did not return a boolean value')
assert.strictEqual(badDrop, false, 'Motorcycle allowed drop-off despite passenger not being in the Motorcycle. (returned true)')
assert.deepEqual(myMotorcycle.passengers, ['Anil'], "Passengers array updated despite being called with an invalid passenger. Expected ['Anil']")
myMotorcycle.off()
assert.strictEqual(myMotorcycle.dropOff('Anil'), false, 'Motorcycle allowed dropping off a passenger when the Motorcycle was off.')
assert.deepEqual(myMotorcycle.passengers, ['Anil'], "Passengers array updated despite Motorcycle being off. Expected ['Anil']")
myMotorcycle.start()
assert.strictEqual(myMotorcycle.dropOff('Anil'), true, 'Motorcycle did NOT allow dropping off up a passenger when the Motorcycle was running.')
assert.deepEqual(myMotorcycle.passengers, [], 'Passengers array not updated. Expected []')
success()

// test pickUp
console.log('Testing seat after drop off')
assert.strictEqual(myMotorcycle.pickUp('Jana Doe'), true, 'Motorcycle did not allow picking up a passenger after freeing a seat.')
assert.deepEqual(myMotorcycle.passengers, [ 'Jana Doe'], "Passengers array not updated. Expected ['Jana Doe']")
success()

// testing passenger count
console.log('Testing passenger count')
assert.equal(typeof (myMotorcycle.passengerCount), 'function', 'there is no passengerCount function')
assert.strictEqual(typeof (myMotorcycle.passengerCount()), 'number', 'passengerCount function did not return a number value')
assert.strictEqual(myMotorcycle.passengerCount(), 1, 'Passenger count seems inaccurate. Expected 1.')
success('Your Motorcycle is ready.')
