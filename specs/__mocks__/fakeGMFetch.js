import GMError from './GMError';
import GMgetVehicleInfoResponse from './GMgetVehicleInfoResponse'
import GMgetSecurityStatusResponse from './GMgetSecurityStatusResponse';
import GMgetEnergyServiceResponse from './GMgetEnergyServiceResponse';
import GMactionEngineServiceResponse from './GMactionEngineServiceResponse';

/**
 * A mock fetch specific when accessing data from the GM API
 * use this in conjunction with the fetchGMData function to 
 * test assumptions.
 * @param {string} path 
 * @param {{ headers: {["Content-Type"]: string}, method: string, body: JSON }} init 
 */
export default function fakeGMFetch(path, init) {
  return new Promise((resolve, reject) => {
    const data = {};
    data.json = function () {
      return new Promise((resolve, reject) => {
        const id = parseId(init);

        //GM's error responses
        if (!hasValidPath(path)) {
          return resolve(new GMError(`invalid path: ${path}`));
        }
        if (!hasHeaders(init)) {
          return resolve(new GMError(`no headers provided`));
        }
        if (!hasValidInit(init)) {
          return resolve(new GMError(`invalid init: ${JSON.stringify(init)}`));
        }
        if (!hasValidID(id)) {
          const error = { "reason": "Vehicle id: " + id + " not found.", "status": "404" };
          return resolve(error);
        }
        if (!requestsResponseType(init)) {
          return resolve(new GMError(`request responseType ${init.body}, OPTIONS: ["JSON"]`));
        }
        //path specific responses
        if (path === `https://gmapi.azurewebsites.net/getVehicleInfoService`) {
          return resolve(GMgetVehicleInfoResponse);
        }
        if (path === `https://gmapi.azurewebsites.net/getSecurityStatusService`) {
          return resolve(GMgetSecurityStatusResponse)
        }
        if (path === `https://gmapi.azurewebsites.net/getEnergyService`) {
          return resolve(GMgetEnergyServiceResponse);
        }
        if (path === `https://gmapi.azurewebsites.net/actionEngineService`) {
          if (!hasValidAction(init)) {
            return resolve(new GMError(`must provide valid action`));
          }
          return resolve(GMactionEngineServiceResponse);
        }

        return resolve('The mock GM fetch needs an update, contact QA to notify');
      })
    }

    return resolve(data);
  });
}

function parseId(init) {
  if (typeof init.body !== 'string') return 'request body must be a string'
  const body = JSON.parse(init.body);
  return body.id;
}

function hasHeaders(init) {
  return !!init.headers;
}

function hasValidID(id) {
  return id === 1234 || id === 1235;
  //refactor when handed actual ids
}

function hasValidInit(init) {
  return init.method === 'POST' &&
    init.headers['Content-Type'] === 'application/json';
}

function hasValidPath(path) {
  return path.includes(`https://gmapi.azurewebsites.net/`) &&
    (
      path.includes(`getEnergyService`) ||
      path.includes(`getVehicleInfoService`) ||
      path.includes(`getSecurityStatusService`) ||
      path.includes(`actionEngineService`)
    );
}

function requestsResponseType(init) {
  if (typeof init.body !== 'string') return false;
  const body = JSON.parse(init.body);
  if (!body.responseType) return false;
  return body.responseType === 'JSON';
  //refactor if desiring types other than JSON
}

function hasValidAction(init) {
  if (typeof init.body !== 'string') return false;
  const body = JSON.parse(init.body);
  if (!body.command) return false;
  return body.command === 'START_VEHICLE' || body.command === 'STOP_VEHICLE';
}

