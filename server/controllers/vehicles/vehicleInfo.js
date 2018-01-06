const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');
const handleErrors = require('../../helpers/handleErrors');

// //request from client
// it should receive a GET request from the client
// it should receive the id of the client in the params

// //request to GM
// it should send a POST request to GM
// it should send the id of the client in the requests body
// it should specify a responseType of "JSON" in the requests body

// //response from GM
// it should receive a response from GM API
// it should receive a "data" attribute
// it should receive a vin number from GM
// it should receive a color from GM
// it should receive a "fourDoorSedan" status from GM
// it should receive a "twoDoorCoupe" status from GM
// it should receive a driveTrain from GM

// //response to client
// it should send a response back to the client
// it should send a vin number
// it should send a color
// it should send a doorCount
// it should send a driveTrain
// it should send a single object

/**
 * Route controller that handles GET requests for a vehicles information.
 * Sends to the client an object that contains the following:
 *   vin, color, door count, and drive train.
 * @param {{ params: { id: number } }} req
 * @param {{ body: { vin: string, color: string, doorCount: number, driveTrain: string } }} res
 */
function vehicleInfo(req, res) {
  handleErrors(res, function () {
    console.log(`received request for vehicle #${req.params.id} info`);
    const path = `https://gmapi.azurewebsites.net/getVehicleInfoService`;
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: req.params.id,
        responseType: 'JSON'
      })
    }
    fetchGMData(path, init, req.params.id)
      .then(processGMVehicleInfoData)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
};

/**
 * Receives the GET request from the GM API and resolves
 * a formatted object to send to the client.
 * @param { Promise } response 
 * @return { Promise }
 */
function processGMVehicleInfoData(response) {
  console.log('processing...\nresponse status:', response.status);
  return new Promise((resolve, reject) => {
    try {
      const { data } = response;
      const processedData = {
        vin: data.vin.value,
        color: data.color.value,
        doorCount: determineDoorCount(data),
        driveTrain: data.driveTrain.value
      };
      console.log('OK: sending data to client')
      resolve(processedData);
    } catch (e) {
      console.log('ERR: sending GM response to the client');
      reject(response);
    }
  });
}

/**
 * Parses response object sent from the GM API;
 * returns the door count.
 * @param {{ fourDoorSedan: { value: string }, twoDoorCoupe: { value: string } }} data
 */
function determineDoorCount(data) {
  if (
    data.fourDoorSedan &&
    data.fourDoorSedan.value === 'True'
  ) {
    return 4;
  } else if (
    data.twoDoorCoupe &&
    data.twoDoorCoupe.value === 'True'
  ) {
    return 2;
  } else {
    throw 'Error: Could not parse GM Data for doorCount';
  }
}

module.exports = {
  vehicleInfo,
  processGMVehicleInfoData,
  determineDoorCount
};