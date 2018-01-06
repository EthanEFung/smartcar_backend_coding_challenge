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

/**
 * A route handler that requests GM API to supply
 * the location and "locked" status of a specified cars doors
 * and sends to the client these points of emphasis
 * @param {{ param: { id: number } }} req 
 * @param {[{ location: string, locked: boolean }, { location: string, locked: boolean }]} res 
 */
function security(req, res) {
  console.log(`request has been made for vehicle #${req.param.id} security status`)
  const path = `https://gmapi.azurewebsites.net/getSecurityStatusService`;
  const init = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      id: req.params.id,
      responseType: 'JSON'
    })
  }

  fetchGMSecurityData(path, init, req.params.id)
    .then(processGMSecurityData)
    .then(data => res.send(data))
    .catch(err => res.send(err));
}

function fetchGMSecurityData(path, init, id) {
  console.log('fetching...')
  return new Promise((resolve, reject) => {
    fetch(path, init)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function processGMSecurityData(response) {
  console.log('processing...');
  return new Promise((resolve, reject) => {
    if (response.status === '400') {
      console.log('ERROR: ', response.reason);
      reject(response);
    }
    const { values } = response.data.doors;

    const doors = values.map(door => {
      return {
        location: door.location.value,
        locked: processLockedStatus(door)
      }
    });
    resolve(doors);
  });
}

function processLockedStatus(door) {
  return door.locked.value === 'True';
}

module.exports = security;