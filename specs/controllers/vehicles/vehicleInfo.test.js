import { vehicleInfo, processGMVehicleInfoData, determineDoorCount } from '../../../server/controllers/vehicles/vehicleInfo';

import { fakeReq, fakeRes } from '../../__mocks__/fakeStreams';
import fakeGMFetch from '../../__mocks__/fakeGMFetch';
import GMgetVehicleInfoResponse from '../../__mocks__/GMgetVehicleInfoResponse';

import { badRequest } from '../../../server/helpers/ErrorResponses';

describe('vehicleInfo functionality', () => {

  it('should have a controller', () => {
    expect.assertions(1);
    expect(vehicleInfo).toBeTruthy();
  });

  it('should send some data', () => {
    expect.assertions(1);
    return vehicleInfo(fakeReq, fakeRes, null, fakeGMFetch)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

  it('should send a proper response', () => {
    expect.assertions(1);
    return vehicleInfo(fakeReq, fakeRes, null, fakeGMFetch)
      .then(data => {
        expect(data).toEqual({
          "color": "Metallic Silver",
          "doorCount": 4,
          "driveTrain": "v8",
          "vin": "123123412412"
        });
      });
  });

  it('should throw if the params does not have a valid id', () => {
    expect.assertions(1);
    return vehicleInfo({ params: { id: 1237 } }, fakeRes, null, fakeGMFetch)
      .then(err => {
        expect(err).toEqual({ status: '404', reason: 'Vehicle id: 1237 not found.' });
      })
  });
})

describe('processGMVehicleInfoData', () => {
  it('Returns if provided with a correctly formatted response', () => {
    expect.assertions(1);
    const test = GMgetVehicleInfoResponse

    return processGMVehicleInfoData(test)
      .then(data => {
        expect(data).toEqual({ "color": "Metallic Silver", "doorCount": 4, "driveTrain": "v8", "vin": "123123412412" })
      });
  });

  it('Returns an Error if no arguments are provided', () => {
    expect.assertions(2);
    return processGMVehicleInfoData()
      .then(data => {
        //this test should be erroring
        expect(true).toBe(false)
      })
      .catch(err => {
        const internalErr = new Error(
          JSON.stringify({
            client_message: 'Error on our end! We need to update our server to our chagrin.',
            status: 500,
            error: {}
          })
        )
        expect(err).toBeInstanceOf(Error);
        expect(err).toEqual(internalErr);
      })
  });

  it('Returns an Error if the object doesnt have "data"', () => {
    expect.assertions(2);
    const test = { tankLevel: { value: "30" } }
    return processGMVehicleInfoData(test)
      .catch(err => {
        const internalErr = new Error(
          JSON.stringify({
            client_message: 'Error on our end! We need to update our server to our chagrin.',
            status: 500,
            error: "GM format change"
          })
        )
        expect(err).toBeInstanceOf(Error);
        expect(err).toEqual(internalErr);
      });
  });

  it('Returns an Error if the "data" object doesnt have a relevant attributes', () => {
    expect.assertions(2);
    const test = GMgetVehicleInfoResponse;
    test.data.vin = undefined;
    return processGMVehicleInfoData(test)
      .catch(err => {
        const internalErr = new Error(
          JSON.stringify({
            client_message: 'Error on our end! We need to update our server to our chagrin.',
            status: 500,
            error: "GM format change"
          })
        )
        expect(err).toBeInstanceOf(Error);
        expect(err).toEqual(internalErr);
      });
  });

  it('Returns an Error if the "data" object doesnt have a "value"', () => {
    expect.assertions(2);
    const test = GMgetVehicleInfoResponse;
    test.data.vin = { type: 'String' };
    return processGMVehicleInfoData(test)
      .then(data => console.log(data))
      .catch(err => {
        const internalErr = new Error(
          JSON.stringify({
            client_message: 'Error on our end! We need to update our server to our chagrin.',
            status: 500,
            error: "GM format change"
          })
        )
        expect(err).toBeInstanceOf(Error);
        expect(err).toEqual(internalErr);
      });
  });
});

describe('determineDoorCount', () => {
  it('parses an object', () => {
    const test = GMgetVehicleInfoResponse
    expect(determineDoorCount(test.data)).toEqual(4);
  });
})