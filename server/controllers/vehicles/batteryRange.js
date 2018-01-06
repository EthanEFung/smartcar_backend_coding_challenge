const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');

/**
 * Controller that receives GET request for battery percentage from the client.
 * The `req` that is provided contains an `id` in its params.
 * Controller sends a POST request to GM according to GM specifications.
 * This controller then sends to the client via the `res` stream
 * a JSON object containing the percentage of battery left.
 * @param {{ params : {id: number} }} req 
 * @param {{ send: function }} res 
 */
function batteryRange(req, res) {
  try {
    console.log(`request has been made for vehicle #${req.params.id} fuel range`)
    const path = `https://gmapi.azurewebsites.net/getEnergyService`;
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: req.params.id,
        responseType: 'JSON'
      })
    }
    fetchGMData(path, init, req.params.id)
      .then(processGMBatteryRangeData)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  } catch (e) {
    const internalErr = {
      client_message: 'Error on our end! We need to update our server to our chagrin.',
      status: 500,
      error: e
    };
    res.send(internalErr);
    throw internalErr;
  }
}

/**
 * Promise that receives response from GM API regarding battery life.
 * Resolves with relevant information having been parsed.
 * @param {{ data: { batteryLevel: { value: string } }}} response 
 */
function processGMBatteryRangeData(response) {
  console.log('processing...');
  return new Promise((resolve, reject) => {
    try {
      const { value } = response.data.batteryLevel;
      resolve({
        percent: parseInt(value)
      });
      console.log('OK: sending JSON to client');
    } catch (e) {
      console.log('Err: could not processes response');
      reject(e);
    }
  });
}

module.exports = { batteryRange, processGMBatteryRangeData };