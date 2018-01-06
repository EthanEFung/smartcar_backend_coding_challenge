const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');

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
 * A route handler that receives requests for the
 * the locations and "locked" statuses of a specified cars doors
 * and sends to the client these points of emphasis
 * @param {{ param: { id: number } }} req 
 * @param {[{ location: string, locked: boolean }, { location: string, locked: boolean }]} res 
 */
function security(req, res) {
  console.log(`request has been made for vehicle #${req.params.id} security status`)
  const path = `https://gmapi.azurewebsites.net/getSecurityStatusService`;
  const init = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      id: req.params.id,
      responseType: 'JSON'
    })
  }

  fetchGMData(path, init, req.params.id)
    .then(processGMSecurityData)
    .then(data => res.send(data))
    .catch(err => res.send(err));
}

/**
 * Promise that receives the GM API response, parses the
 * data and resolves a simplified array
 * @param {{ data: { doors: { values: [] } } }} response 
 */
function processGMSecurityData(response) {
  console.log('processing...\nresponse status:', response.status);
  return new Promise((resolve, reject) => {
    try {
      handleGMErrors(response);
      const { values } = response.data.doors;
      const doors = values.map(door => {
        return {
          location: door.location.value,
          locked: processLockedStatus(door)
        }
      });
      console.log('OK: sending JSON to the client');
      resolve(doors);
    } catch (e) {
      console.log('ERR: sending GM response to the client');
      reject(response);
    }
  });
}

/**
 * A predicate function that determines whether a given door is locked
 * @param {{ location: { type: string, value: string }, locked: { type: string, value: string }}} door 
 */
function processLockedStatus(door) {
  return door.locked.value === 'True';
}

module.exports = {
  security,
  processGMSecurityData,
  processLockedStatus
};