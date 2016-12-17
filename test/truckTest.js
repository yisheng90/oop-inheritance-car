// load the assert plugin (for testing)
var assert = require('assert')
var success = require('./helpers/success')

// load the Truck class
var Car = require('../src/Car')
var Truck = require('../src/Truck')

// Your tests will go below here

// test constructor
console.log('Testing Constructor')
var myTruck = new Truck('Acura', 'Integra', 1999, 'Red', ['Anil', 'Sarah'])
assert.strictEqual(myTruck.make, 'Acura', 'The constrcutor did not set make.')
assert.strictEqual(myTruck.model, 'Integra', 'The constructor did not set model.')
assert.strictEqual(myTruck.year, 1999, 'The constructor did not set year.')
assert.strictEqual(myTruck.color, 'Red', 'The constructor did not set color.')
assert.deepEqual(myTruck.passengers, ['Anil', 'Sarah'], 'The constructor did not set passengers')
assert.strictEqual(myTruck.seats, 3, 'The constructor did not set default seats as 3')
success()

// test instance
assert.strictEqual(myTruck instanceof Truck, true, 'This truck is not an instance of Truck object')
assert.strictEqual(myTruck instanceof Car, true, 'This truck is not an instance of Truck object')
success('Congraturation. You have completed the first part')

// test start
console.log('Testing starting the Truck')
assert.equal(typeof (myTruck.start), 'function', 'there is no start() function')
myTruck.start()
assert.strictEqual(myTruck.running, true, 'Failed to start the Truck. running should = true')
success()

// test start
console.log('Testing turning off the Truck')
assert.equal(typeof (myTruck.off), 'function', 'there is no off function')
myTruck.off()
assert.strictEqual(myTruck.running, false, 'Failed to turn off the Truck. running should = false')
success()

// test driveTo
console.log('Testing driving the Truck')
assert.equal(typeof (myTruck.driveTo), 'function', 'there is no driveTo function')
assert.strictEqual(typeof (myTruck.driveTo('place')), 'boolean', 'DriveTo function did not return a boolean value')
assert.strictEqual(myTruck.driveTo('place'), false, 'Truck allowed driving while NOT running.')
myTruck.start()
assert.strictEqual(myTruck.driveTo('place'), true, 'Truck did not allow driving while running.')
success()

// test driveTo
console.log('Testing parking the Truck')
assert.equal(typeof (myTruck.park), 'function', 'there is no park function')
assert.strictEqual(typeof (myTruck.park()), 'boolean', 'park function did not return a boolean value')
assert.strictEqual(myTruck.park(), false, 'Truck did not allow parking while NOT running.')
myTruck.off()
assert.strictEqual(myTruck.park(), true, 'Truck allowed parking while running.')
success('YAY!!! You finished phase 2 for Truck. Continue to phase 3. Almost done.')

// //// TEST PHASE 3 /////////////////////////////////////////

// test constructor with passengers
console.log('Testing Constructor (with passsengers)')
myTruck = new Truck('Acura', 'Integra', 1999, 'Red')
assert.deepEqual(myTruck.passengers, [], 'Passengers does not default to an empty array if left blank.')
myTruck = new Truck('Acura', 'Integra', 1999, 'Red', ['Anil'])
assert.deepEqual(myTruck.passengers, ['Anil'], "Passengers array not updated. Expected ['Anil','Sarah']")
success()

// test pickUp
console.log('Testing picking up a passenger')
assert.equal(typeof (myTruck.pickUp), 'function', 'there is no pickUp function')
assert.strictEqual(typeof (myTruck.pickUp()), 'boolean', 'pickUp function did not return a boolean value')
assert.strictEqual(myTruck.pickUp('Randall'), false, 'Truck did allowed picking up a passenger while NOT running (returned true).')
myTruck.start()
assert.strictEqual(myTruck.pickUp('Randall'), true, 'Truck did not allow picking up a passenger (returned false).')
assert.deepEqual(myTruck.passengers, ['Anil', 'Randall'], "Passengers array not updated. Expected ['Anil','Randall']")
success()

// test pickUp
console.log('Testing seat limit')
assert.strictEqual(myTruck.pickUp('Jane Doe'), false, 'Truck allowed picking up a passenger despite all seats being filled.')
assert.deepEqual(myTruck.passengers, ['Anil', 'Randall'], "Passengers array updated despite all seats being filled. Expected ['Anil',' Randall']")
success()

// test dropOff
console.log('Testing dropping off a passenger')
assert.equal(typeof (myTruck.dropOff), 'function', 'there is no dropOff function')
var badDrop = myTruck.dropOff('NotInTheTruck')
assert.strictEqual(typeof (badDrop), 'boolean', 'dropOff function did not return a boolean value')
assert.strictEqual(badDrop, false, 'Truck allowed drop-off despite passenger not being in the Truck. (returned true)')
assert.deepEqual(myTruck.passengers, ['Anil', 'Randall'], "Passengers array updated despite being called with an invalid passenger. Expected ['Anil','Randall']")
myTruck.off()
assert.strictEqual(myTruck.dropOff('Anil'), false, 'Truck allowed dropping off a passenger when the Truck was off.')
assert.deepEqual(myTruck.passengers, ['Anil', 'Randall'], "Passengers array updated despite Truck being off. Expected ['Anil','Randall']")
myTruck.start()
assert.strictEqual(myTruck.dropOff('Anil'), true, 'Truck did NOT allow dropping off up a passenger when the Truck was running.')
assert.deepEqual(myTruck.passengers, [ 'Randall'], "Passengers array not updated. Expected ['Randall']")
success()

// test pickUp
console.log('Testing seat after drop off')
assert.strictEqual(myTruck.pickUp('Jana Doe'), true, 'Truck did not allow picking up a passenger after freeing a seat.')
assert.deepEqual(myTruck.passengers, [ 'Randall', 'Jana Doe'], "Passengers array not updated. Expected ['Randall','Jana Doe']")
success()

// testing passenger count
console.log('Testing passenger count')
assert.equal(typeof (myTruck.passengerCount), 'function', 'there is no passengerCount function')
assert.strictEqual(typeof (myTruck.passengerCount()), 'number', 'passengerCount function did not return a number value')
assert.strictEqual(myTruck.passengerCount(), 2, 'Passenger count seems inaccurate. Expected 2.')
success('Your Truck is ready. Now it\'s time to implement the Motorcyle')
