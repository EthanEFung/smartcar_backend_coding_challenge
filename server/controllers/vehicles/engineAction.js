const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');

/**
 * Controller that receives POST requests from a specific client
 * specified as an `id` in the URL parameters. Requires a `action` statement
 * of `START` or `STOP` specified in the `req`'s `body`. Sends a POST request to the GM API. 
 * Sends back to the client via the `res` parameter's `send` 
 * method a JSON object detailing`success` or `error` as a `status`.
 * @param {{ params: { id: number }, body: { action: string }}} req 
 * @param {{ send: function }} res 
 */
function engineAction(req, res) {
  try {
    // console.log(`request has been made for vehicle #${req.params.id} engine action`);
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

/**
 * Parses the clients action and renders `START_VEHICLE` or `STOP_VEHICLE`,
 * as specified for the GM API.
 * @param {string} action 
 * @return {string}
 */
function parseEngineActionRequest(action) {
  try {
    if (action === 'START') return 'START_VEHICLE';
    if (action === 'STOP') return 'STOP_VEHICLE';
    throw `Bad Request: submit 'START' or 'STOP' as an action in the body of your JSON`;
  } catch (e) {
    throw {
      error: e,
      status: 400
    }
  }
}

/**
 * Promise that receives a GM API response that contains
 * a `status` in the `actionResult` object.
 * Resolves an object with a `status` formatted according
 * to smart car specifications. Important: the status that
 * is passed to the function must contain either 'START'
 * or 'STOP', else it will not function.
 * @param {{status: string, actionResult: { status: string }}} response 
 */
function processGMEngineActionData(response) {
  // console.log(`processing...\nresponse from general motors: ${response.status}`);
  return new Promise((resolve, reject) => {
    try {
      const { status } = response.actionResult;
      if (!status) throw 'GM formatting error';
      resolve({
        status: parseEngineActionResponse(status)
      });
      // console.log('OK: sending JSON to client');
    } catch (e) {
      // console.log('Err: could not processes response');
      const internalError = new Error(
        JSON.stringify({
          client_message: 'Error on our end! We need to update our server to our chagrin.',
          error: e,
          status: 500
        })
      )
      reject(internalError);
    }
  });
}

/**
 * Parses the actionResult `status` attribute sent as a response from GM
 * into a status in accordance to smartcar specifications. 
 * @param {string} status 
 * @return {string} GM status
 */
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