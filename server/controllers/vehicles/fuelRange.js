const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');

/**
 * A controller that receives GET requests from a specific client specified in the
 * `req.params` by `id`. Sends a POST request to the GM API according to their
 * specifications, and sends back to the client a JSON object that includes the 
 * `percent` of fuel the client has.
 * @param {{ params: { id: number }}} req 
 * @param {{ send: function }} res 
 */
function fuelRange(req, res) {
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
      .then(processGMFuelRangeData)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  } catch (e) {
    const internalErr = {
      client_message: 'Error on our end! We need to update our server to our chagrin.',
      status: 500,
      error: 'Internal Error:\n' + e
    }
    res.send(internalErr);
    throw internalErr;
  }
}

/**
 * A Promise that receives a JSON response from the GM API.
 * The GM response contains a `data` object with a `tankLevel`.
 * This Promise resolves an object that contains `percent` of 
 * fuel client has.
 * @param {{ data: { tankLevel: { value: string } } }} response 
 */
function processGMFuelRangeData(response) {
  console.log('processing...');
  return new Promise((resolve, reject) => {
    try {
      const { value } = response.data.tankLevel;
      console.log('OK: sending JSON to client');
      resolve({
        percent: parseInt(value)
      });

    } catch (e) {
      const internalErr = {
        client_message: 'Error on our end! We need to update our server to our chagrin.',
        status: 500,
        error: e
      };
      reject(internalErr);
    }
  });
}


module.exports = { fuelRange, processGMFuelRangeData };