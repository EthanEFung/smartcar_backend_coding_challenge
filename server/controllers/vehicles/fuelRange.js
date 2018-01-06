const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');
// //request from client
// should receive a GET request from the client
// should receive the id of the client in the params

// //request to GM
// should send a POST request to GM
// should specify the clients id in the request body
// should specify a responseType of "JSON" in the request body

// //response from GM
// should receive a response object from GM API
// should contain a data object
// should have a tankLevel in the data object
// should have a batteryLevel in  the data object
// should have a value specified for the tankLevel and the batteryLevel

// //response to client
// should send a response back to the client
// should send the percentage of fuel left
// should send an object

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
    res.send(internalErr)
    throw internalErr;
  }
}

function processGMFuelRangeData(response) {
  console.log('processing...');
  return new Promise((resolve, reject) => {
    try {
      const { value } = response.data.tankLevel
      resolve({
        percent: parseInt(value)
      });
      console.log('OK: sending JSON to client');
    } catch (e) {
      const internalErr = {
        client_message: 'Error on our end! We need to update our server to our chagrin.',
        status: 500,
        error: e
      };
      throw internalErr;
    }
  });
}


module.exports = { fuelRange, processGMFuelRangeData };