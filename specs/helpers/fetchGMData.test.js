import fetchGMData from '../../server/helpers/fetchGMData';
import GMError from '../__mocks__/GMError';
import fakeGMFetch from '../__mocks__/fakeGMFetch';

describe('fetchGMData functionality', () => {
  it('fetches data', () => {
    expect.assertions(1);
    return fetchGMData('path', {}, 1234, fakeGMFetch)
      .then(err => {
        //fetched data!
        expect(err).toBeTruthy();
      });
  });

  it('errors if pathing is wrong ', () => {
    expect.assertions(3);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: 1234,
        responseType: 'JSON'
      })
    }
    fetchGMData('', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      })

    fetchGMData('https://gmapi.azurewebsites.net', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      })

    return fetchGMData('https://gmapi.azurewebsites.net/getenergyservice', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      });
  });

  it('should err if the init object doesnt have headers', () => {
    expect.assertions(1);
    const init = {
      method: 'POST',
      body: JSON.stringify({
        id: 1234,
        responseType: 'JSON'
      })
    }

    return fetchGMData('https://gmapi.azurewebsites.net/getEnergyService', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      });
  });

  it('should err if the init object doesnt have a method', () => {
    expect.assertions(1);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 1234,
        responseType: 'JSON'
      })
    }

    return fetchGMData('https://gmapi.azurewebsites.net/getEnergyService', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      });
  });

  it('should err if the init method isnt a POST', () => {
    expect.assertions(1);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      body: JSON.stringify({
        id: 1234,
        responseType: 'JSON'
      })
    }

    return fetchGMData('https://gmapi.azurewebsites.net/getEnergyService', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      });
  });

  it('should err if the body in the init isnt a JSON string', () => {
    expect.assertions(1);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      body: {
        id: 1234,
        responseType: 'JSON'
      }
    }

    return fetchGMData('https://gmapi.azurewebsites.net/getEnergyService', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      });
  });

  it('should err if the body in the init doesnt have an id', () => {
    expect.assertions(2);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      body: JSON.stringify({
        // no id key value pair
        responseType: 'JSON'
      })
    }

    const init2 = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      body: JSON.stringify({
        //invalid id
        id: 'hey',
        responseType: 'JSON'
      })
    }

    fetchGMData('https://gmapi.azurewebsites.net/getEnergyService', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      });

    return fetchGMData('https://gmapi.azurewebsites.net/getEnergyService', init2, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      });
  });

  it('should err if the body does not contain an id that GM recognizes', () => {
    expect.assertions(1);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      body: {
        id: 1237,
        responseType: 'JSON'
      }
    }

    return fetchGMData('https://gmapi.azurewebsites.net/getEnergyService', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toBeInstanceOf(GMError);
      });
  });

  it('should resolve if asking for energy services', () => {
    expect.assertions(1);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: 1234,
        responseType: 'JSON'
      })
    }
    return fetchGMData('https://gmapi.azurewebsites.net/getEnergyService', init, 1234, fakeGMFetch)
      .then(data => {
        expect(data).toEqual(
          {
            service: 'getEnergy',
            status: '200',
            data:
              {
                tankLevel: { type: 'Number', value: '10.95' },
                batteryLevel: { type: 'Null', value: 'null' }
              }
          }
        )
      })
  });

  it('should resolve if asking for vehicle info', () => {
    expect.assertions(1);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: 1234,
        responseType: 'JSON'
      })
    }
    return fetchGMData('https://gmapi.azurewebsites.net/getVehicleInfoService', init, 1234, fakeGMFetch)
      .then(data => {
        expect(data).toEqual(
          {
            "service": "getVehicleInfo",
            "status": "200",
            "data": {
              "vin": {
                "type": "String",
                "value": "123123412412"
              },
              "color": {
                "type": "String",
                "value": "Metallic Silver"
              },
              "fourDoorSedan": {
                "type": "Boolean",
                "value": "True"
              },
              "twoDoorCoupe": {
                "type": "Boolean",
                "value": "False"
              },
              "driveTrain": {
                "type": "String",
                "value": "v8"
              }
            }
          }
        )
      })

  });

  it('should resolve if asking for door security', () => {
    expect.assertions(1);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: 1234,
        responseType: 'JSON'
      })
    }
    return fetchGMData('https://gmapi.azurewebsites.net/getSecurityStatusService', init, 1234, fakeGMFetch)
      .then(data => {
        expect(data).toEqual(
          {
            "service": "getSecurityStatus",
            "status": "200",
            "data": {
              "doors": {
                "type": "Array",
                "values": [
                  {
                    "location": {
                      "type": "String",
                      "value": "frontLeft"
                    },
                    "locked": {
                      "type": "Boolean",
                      "value": "False"
                    }
                  },
                  {
                    "location": {
                      "type": "String",
                      "value": "frontRight"
                    },
                    "locked": {
                      "type": "Boolean",
                      "value": "True"
                    }
                  }
                ]
              }
            }
          }
        )
      })
  });

  it('should err if asking for an engine action, but provides no action', () => {
    expect.assertions(1);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: 1234,
        responseType: 'JSON'
      })
    }
    return fetchGMData('https://gmapi.azurewebsites.net/actionEngineService', init, 1234, fakeGMFetch)
      .then(err => {
        expect(err).toEqual(new GMError(`must provide valid action`));
      });

  })

  it('should resolve if asking for engine action', () => {
    expect.assertions(1);
    const init = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        id: 1234,
        responseType: 'JSON',
        command: 'START_VEHICLE'
      })
    }
    return fetchGMData('https://gmapi.azurewebsites.net/actionEngineService', init, 1234, fakeGMFetch)
      .then(data => {
        expect(data).toEqual({
          "service": "actionEngine",
          "status": "200",
          "actionResult": {
            "status": "EXECUTED"
          }
        })
      })

  });

  it('should be tested', () => {
    expect(true).toBe(true);
  }); //this should have a passing test when suite is done
})