/**
 * template tests that can be used to develop unit tests for the vehicles router
 */

// describe('the vehicle router', () => {
//   describe('/:id', () => {
//     //request from client
//     it('should receive a GET request from the client');
//     it('should receive the id of the client in the params');

//     //request to GM
//     it('should send a POST request to GM');
//     it('should send the id of the client in the requests body');
//     it('should specify a responseType of "JSON" in the requests body');

//     //response from GM
//     it('should receive a response from GM API');
//     it('should receive a "data" attribute');
//     it('should receive a vin number from GM');
//     it('should receive a color from GM');
//     it('should receive a "fourDoorSedan" status from GM');
//     it('should receive a "twoDoorCoupe" status from GM');
//     it('should receive a driveTrain from GM');

//     //response to client
//     it('should send a response back to the client');
//     it('should send a vin number');
//     it('should send a color');
//     it('should send a doorCount');
//     it('should send a driveTrain');
//     it('should send a single object');
//   });

//   describe('/:id/doors', () => {
//     //request from client
//     it('should receive a GET request from the client');
//     it('should receive the id of the client in the params');

//     //request to GM
//     it('should send a POST request to GM');
//     it('should send the clients id in the body of the request to GM');
//     it('should specify the responseType to be JSON in the body of the request');

//     //response from GM
//     it('should receive a response from GM API');
//     it('should receive a "data" object from GM');
//     it('has the "doors" object nested in the data object');
//     it('has the "values" array nested in the doors object');
//     it('has door objects for each door, which store location and locked');
//     it('has a value attribute for each door location');
//     it('has a value attribute for each door\'s "locked" status');

//     //response to client
//     it('should send a response back to the client');
//     it('should send an array to the client');
//     it('should send an object for each door location to the client');
//     it('should send a "locked status" for each door to the client');
//     it('should send a location for each door to the client');
//   });

//   describe('/:id/fuel', () => {
//     //request from client
//     it('should receive a GET request from the client');
//     it('should receive the id of the client in the params');

//     //request to GM
//     it('should send a POST request to GM');
//     it('should specify the clients id in the request body');
//     it('should specify a responseType of "JSON" in the request body');

//     //response from GM
//     it('should receive a response object from GM API');
//     it('should contain a data object');
//     it('should have a tankLevel in the data object');
//     it('should have a batteryLevel in  the data object');
//     it('should have a value specified for the tankLevel and the batteryLevel');

//     //response to client
//     it('should send a response back to the client');
//     it('should send the percentage of fuel left');
//     it('should send an object');
//   });

//   describe('/:id/battery', () => {
//     //request from client
//     it('should receive a GET request from the client');
//     it('should receive the id of the client in the params');

//     //request to GM
//     it('should send a POST request to GM');
//     it('should specify the clients id in the request body');
//     it('should specify a responseType of "JSON" in the request body');

//     //response from GM
//     it('should receive a response object from GM API');
//     it('should contain a data object');
//     it('should have a tankLevel in the data object');
//     it('should have a batteryLevel in  the data object');
//     it('should have a value specified for the tankLevel and the batteryLevel');

//     //response to client
//     it('should send a response back to the client');
//     it('should send the percentage of battery left');
//     it('should send an object');
//   });

//   describe('/:id/engine', () => {
//     //request from client
//     it('should receive a POST request from the client');
//     it('should receive the "action" of the client in the request body');

//     //request to GM
//     it('should send a POST request to GM');
//     it('should send the id in the body of the request to GM');
//     it('should send the "command" in the body of the request to GM');
//     it('should send the "responseType" as JSON in the body of the request to GM');

//     //response from GM
//     it('should receive a response from GM API');
//     it('should receive an "actionResult" JSON object');
//     it('should contain a status of the cars engine in the actionResult');

//     //response to client
//     it('should send a response back to the client');
//     it('should send a status of the cars engine');
//     it('should send an object');
//   });
// })