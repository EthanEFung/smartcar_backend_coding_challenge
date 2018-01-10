const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');

/**
 * A route controller that receives GET requests for the
 * the `location` and `locked` statuses of a specified car's doors
 * and sends via the `res` parameter's `send` method a JSON array 
 * of objects containing these door statuses to the client.
 * Controller sends GM a POST request as detailed in GM specifications.
 * @param {{ param: { id: number } }} req 
 * @param {{ send: function }} res 
 */
function security(req, res, next, fetch = require('node-fetch')) {
  try {
    // console.log(`request has been made for vehicle #${req.params.id} security status`)
    const path = `https://gmapi.azurewebsites.net/getSecurityStatusService`;
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: req.params.id,
        responseType: 'JSON'
      })
    }

    return fetchGMData(path, init, req.params.id, fetch)
      .then(processGMSecurityData)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  } catch (e) {
    const internalErr = {
      client_message: 'Error on our end! We need to update our server to our chagrin.',
      status: 500,
    };
    return res.send(internalErr);
    throw 'Internal Error:\n' + e;
  }
}

/**
 * Promise that receives the GM API response, parses the
 * data and resolves a simplified array
 * @param {{ data: { doors: { values: [] } } }} response 
 */
function processGMSecurityData(response) {
  return new Promise((resolve, reject) => {
    try {
      const { values } = response.data.doors;
      const doors = values.map(door => {
        return {
          location: door.location.value,
          locked: processLockedStatus(door)
        }
      });
      resolve(doors);
    } catch (e) {
      const internalError = Error(JSON.stringify({
        client_message: 'Error on our end! We need to update our server to our chagrin.',
        status: 500,
        error: e
      }))
      reject(internalError);
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