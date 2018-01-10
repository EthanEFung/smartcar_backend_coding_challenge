const Promise = require('promise-polyfill');
const fetchGMData = require('../../helpers/fetchGMData');
const handleGMErrors = require('../../helpers/handleGMErrors');
const { badRequest } = require('../../helpers/ErrorResponses');

/**
 * Controller that receives POST requests from a specific client
 * specified as an `id` in the URL parameters. Requires a `action` statement
 * of `START` or `STOP` specified in the `req`'s `body`. Sends a POST request to the GM API. 
 * Sends back to the client via the `res` parameter's `send` 
 * method a JSON object detailing`success` or `error` as a `status`.
 * 
 * The 'next' parameter: this is the middleware placeholder as detailed in the
 * express.js documentation. You can learn about passing middleware functions
 * to route handlers, in the "Route Handlers" section: "http://expressjs.com/en/guide/routing.html"
 * No call on this function will be made.
 *
 * Optionally, a mock fetch can be passed this callback for testing purposes.
 * Controller will default to the node-fetch dependency if no fetch is specified.
 * 
 * @param {{ params: { id: number }, body: { action: string }}} req 
 * @param {{ send: function }} res 
 * @param {{ function }} next
 * @param {{ function }} fetch
 */
function engineAction(req, res, next, fetch = require('node-fetch')) {
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
    return fetchGMData(path, init, req.params.id, fetch)
      .then(processGMEngineActionData)
      .then(data => {
        // console.log('doesnt error', data)
        return res.send(data)
      })
      .catch(err => {
        // console.log('errors', err)
        return res.send(err)
      });

  } catch (e) {
    // console.log('errors?', e);
    return res.send(e);
  }
}

/**
 * Parses the clients action and renders `START_VEHICLE` or `STOP_VEHICLE`,
 * as specified for the GM API.
 * @param {string} action 
 * @return {string}
 */
function parseEngineActionRequest(action) {
  if (action === 'START') return 'START_VEHICLE';
  if (action === 'STOP') return 'STOP_VEHICLE';
  throw badRequest;
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
  if (status === 'EXECUTED') return 'success';
  if (status === 'FAILED') return 'error';
  throw `status needs to be updated to support "${status}"`
}

module.exports = {
  engineAction,
  parseEngineActionRequest,
  processGMEngineActionData,
  parseEngineActionResponse
};