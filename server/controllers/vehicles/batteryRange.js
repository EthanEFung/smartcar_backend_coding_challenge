const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');

/**
 * Controller that receives GET request for battery percentage from the client.
 * The `req` that is provided contains an `id` in its params.
 * Controller sends a POST request to GM according to GM specifications.
 * This controller then sends to the client via the `res` stream
 * a JSON object containing the percentage of battery left if the car
 * is electric.  Otherwise, the percentage is null.
 * 
 * The 'next' parameter: this is the middleware placeholder as detailed in the
 * express.js documentation. You can learn about passing middleware functions
 * to route handlers, in the "Route Handlers" section: "http://expressjs.com/en/guide/routing.html"
 * No call on this function will be made.
 * 
 * Optionally, a mock fetch can be passed this callback for testing purposes.
 * Controller will default to the node-fetch dependency if no fetch is specified.
 * 
 * @param {{ params : {id: number} }} req 
 * @param {{ send: function }} res 
 * @param {{ function }} next 
 * @param {{ function }} fetch
 */
function batteryRange(req, res, next, fetch = require('node-fetch')) {
  try {
    // console.log(`request has been made for vehicle #${req.params.id} fuel range`)
    const path = `https://gmapi.azurewebsites.net/getEnergyService`;
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: req.params.id,
        responseType: 'JSON'
      })
    }
    return fetchGMData(path, init, req.params.id, fetch)
      .then(processGMBatteryRangeData)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  } catch (e) {
    const internalErr = {
      client_message: 'Error on our end! We need to update our server to our chagrin.',
      status: 500,
      error: e
    };
    return res.send(internalErr);
  }
}

/**
 * Promise that receives response from GM API regarding battery life.
 * Resolves with relevant information having been parsed.
 * @param {{ data: { batteryLevel: { value: string } }}} response 
 */
function processGMBatteryRangeData(response) {
  // console.log('processing...');
  return new Promise((resolve, reject) => {
    try {
      const { value } = response.data.batteryLevel;
      if (!value) throw 'GM format change';
      resolve({
        percent: parsePercent(value)
      });
      // console.log('OK: sending JSON to client');
    } catch (e) {
      const internalErr = new Error(
        JSON.stringify({
          client_message: 'Error on our end! We need to update our server to our chagrin.',
          status: 500,
          error: e
        })
      )
      // console.log('Err: could not processes response');
      reject(internalErr);
    }
  });
}

/**
 * function that parses response value from GM. returns either a number or null
 * @param {string} value
 */
function parsePercent(value) {
  if (value === 'null') return null;
  return parseInt(value);
}

module.exports = { batteryRange, processGMBatteryRangeData };