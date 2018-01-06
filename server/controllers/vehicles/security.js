const fetch = require('node-fetch');
const Promise = require('promise-polyfill');

// //request from client
// it should receive a GET request from the client'
// it should receive the id of the client in the params'

// //request to GM
// it should send a POST request to GM'
// it should send the clients id in the body of the request to GM'
// it should specify the responseType to be JSON in the body of the request'

// //response from GM
// it should receive a response from GM API'
// it should receive a "data" object from GM'
// it has the "doors" object nested in the data object'
// it has the "values" array nested in the doors object'
// it has door objects for each door, which store location and locked'
// it has a value attribute for each door location'
// it has a value attribute for each door\'s "locked" status

// //response to client
// it should send a response back to the client'
// it should send an array to the client'
// it should send an object for each door location to the client'
// it should send a "locked status" for each door to the client'
// it should send a location for each door to the client'

function security(req, res) {

}

module.exports = security;