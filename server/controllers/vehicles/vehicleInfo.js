const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');

/**
 * Route controller that handles GET requests for a vehicles information.
 * Sends to the client an object that contains the following:
 *   `vin`, `color`, `door count`, and `drive train`.
 * Controller sends a POST request to the GM API as per GM specifications.
 * @param {{ params: { id: number } }} req
 * @param {{ body: { vin: string, color: string, doorCount: number, driveTrain: string } }} res
 */
function vehicleInfo(req, res, next, fetch = require('node-fetch')) {
  try {
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
    return fetchGMData(path, init, req.params.id, fetch)
      .then(processGMVehicleInfoData)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  } catch (e) {
    const internalErr = {
      client_message: 'Error on our end! We need to update our server to our chagrin.',
      status: 500,
    };
    return res.send(internalErr);

  }
};

/**
 * Promise that receives a GM API reponse and resolves
 * a formatted object to send to the client.
 * @param {{ status: string, data: { vin: { value: string }, color: { value: string }, doorCount:{ value: string }, driveTrain:{ value: string }} }} response 
 */
function processGMVehicleInfoData(response) {
  // console.log('processing...\nresponse status:', response.status);
  return new Promise((resolve, reject) => {
    try {
      const { data } = response;
      if (hasMissingAttribute(data)) throw "GM format change";
      const processedData = {
        vin: data.vin.value,
        color: data.color.value,
        doorCount: determineDoorCount(data),
        driveTrain: data.driveTrain.value
      };
      // console.log('OK: sending data to client')
      resolve(processedData);
    } catch (e) {
      // console.log('ERR: sending GM response to the client', e);
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
 * Predicate function that evaluates the data object sent from GM, and returns
 * a boolean whether the data is missing an attribute that is needed to send 
 * the client a satisfactory JSON object.
 * @param {{vin:{ type: string, value: string }, color: {type: string, value: string }, fourDoorSedan: {type: string, value: string}, twoDoorCoupe: {type: string, value:string}, driveTrain: { type: string, value: string}}} data
 * @return {boolean}
 */
function hasMissingAttribute(data) {
  if (
    !data ||

    !data.vin ||
    !data.color ||
    !data.fourDoorSedan ||
    !data.twoDoorCoupe ||
    !data.driveTrain ||

    !data.vin.value ||
    !data.color.value ||
    !data.fourDoorSedan.value ||
    !data.twoDoorCoupe.value ||
    !data.driveTrain.value

  ) return true;

  else return false;

}

/**
 * Function that parses them response object sent from the GM API.
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