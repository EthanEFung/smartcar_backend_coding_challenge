const fetch = require('node-fetch');
const Promise = require('promise-polyfill');

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
 * route controller that handles GET requests for a given information
 * Sends to the client a JSON object that 
 * @param {{ params: { id: number } }} req - a readable stream that contains an id param
 * @param {{ body: { vin: string, color: string, doorCount: number, driveTrain: string } }} res - a writeable stream that is sent to the client
 */
function vehicleInfo(req, res) {
  console.log(`received request for vehicle #${req.params.id} info`);
  fetchGMVehiclInfo(req.params.id)
    .then(processGMData)
    .then(data => res.send(data))
    .catch(err => res.send(err));
}

function fetchGMVehiclInfo(id) {
  console.log('fetching..');
  //request vehicle information from GM
  const path = `https://gmapi.azurewebsites.net/getVehicleInfoService`;
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      responseType: 'JSON'
    })
  }
  return new Promise((resolve, reject) => {
    fetch(path, init)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
}

function processGMData(response) {
  console.log('processing...');
  return new Promise((resolve, reject) => {
    if (response.status === '404') {
      reject(response);
    }
    const { data } = response;
    const processedData = {
      vin: data.vin.value,
      color: data.color.value,
      doorCount: determineDoorCount(data),
      driveTrain: data.driveTrain.value
    };
    resolve(processedData);
  });
}

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

module.exports = vehicleInfo;