const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');

// Specifications:
// //request from client
// should receive a POST request from the client
// should receive the "action" of the client in the request body

// //request to GM
// should send a POST request to GM
// should send the id in the body of the request to GM
// should send the "command" in the body of the request to GM
// should send the "responseType" as JSON in the body of the request to GM

// //response from GM
// should receive a response from GM API
// should receive an "actionResult" JSON object
// should contain a status of the cars engine in the actionResult

// //response to client
// should send a response back to the client
// should send a status of the cars engine
// should send an object

function engineAction(req, res) {
  try {
    console.log(`request has been made for vehicle #${req.params.id} engine action`);
    const path = `https://gmapi.azurewebsites.net/actionEngineService`;
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: req.params.id,
        responseType: 'JSON',
        command: parseEngineActionRequest(req.body.action)
      })
    };
    fetchGMData(path, init, req.params.id)
      .then(processGMEngineActionData)
      .then(data => res.send(data))
      .catch(err => {
        res.send(err);
      });
  } catch (e) {
    res.send(e);
  }
}

function parseEngineActionRequest(action) {
  try {
    if (action === 'START') return 'START_VEHICLE';
    if (action === 'STOP') return 'STOP_VEHICLE';
    throw `Bad Request: submit START or STOP as an action in the body of your JSON`;
  } catch (e) {
    throw {
      error: e,
      status: 400
    }
  }
}

function processGMEngineActionData(response) {
  console.log(`processing...\nresponse from general motors: ${response.status}`);
  return new Promise((resolve, reject) => {
    try {
      const { status } = response.actionResult;
      resolve({
        action: parseEngineActionResponse(status)
      });
      console.log('OK: sending JSON to client');
    } catch (e) {
      console.log('Err: could not processes response');
      reject(e);
    }
  });
}

function parseEngineActionResponse(status) {
  try {
    if (status === 'EXECUTED') return 'success';
    if (status === 'FAILED') return 'error';
    throw `status needs to be updated to support "${status}"`;
  } catch (e) {
    throw {
      client_message: 'Error on our end! We need to update our server to our chagrin.',
      status: 500,
      error: e
    };
  }
}

module.exports = {
  engineAction,
  parseEngineActionRequest,
  processGMEngineActionData,
  parseEngineActionResponse
};