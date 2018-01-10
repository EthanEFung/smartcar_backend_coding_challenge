import { fuelRange, processGMFuelRangeData } from '../../../server/controllers/vehicles/fuelRange';

import { fakeReq, fakeRes } from '../../__mocks__/fakeStreams';
import fakeGMFetch from '../../__mocks__/fakeGMFetch';
import GMgetEnergyServiceResponse from '../../__mocks__/GMgetEnergyServiceResponse';

import { badRequest } from '../../../server/helpers/ErrorResponses';

describe('fuelRange functionality', () => {

  it('should have a controller', () => {
    expect.assertions(1);
    expect(fuelRange).toBeTruthy();
  });

  it('should send some data', () => {
    expect.assertions(1);
    return fuelRange(fakeReq, fakeRes, null, fakeGMFetch)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

  it('should send a proper response', () => {
    expect.assertions(1);
    return fuelRange(fakeReq, fakeRes, null, fakeGMFetch)
      .then(data => {
        expect(data).toEqual({ "percent": 10 });
      });
  });

  it('should throw if the params does not have a valid id', () => {
    expect.assertions(1);
    return fuelRange({ params: { id: 1237 } }, fakeRes, null, fakeGMFetch)
      .then(err => {
        expect(err).toEqual({ status: '404', reason: 'Vehicle id: 1237 not found.' });
      })
  });
});

describe('processGMFuelRangeData', () => {
  it('Returns if provided with a correctly formatted response', () => {
    expect.assertions(1);
    const test = {
      data: {
        tankLevel: { value: "30" }
      }
    }
    return processGMFuelRangeData(test)
      .then(data => {
        expect(data).toEqual({ percent: 30 })
      });
  });

  it('Returns an Error if no arguments are provided', () => {
    expect.assertions(2);
    return processGMFuelRangeData()
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
    return processGMFuelRangeData(test)
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
      });
  });

  it('Returns an Error if the "data" object doesnt have a "tankLevel"', () => {
    expect.assertions(2);
    const test = {
      data: {
        batteryLevel: { value: "30" }
      }
    }
    return processGMFuelRangeData(test)
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
      });
  });

  it('Returns an Error if the "tankLevel" object doesnt have a "value"', () => {
    expect.assertions(2);
    const test = {
      data: {
        tankLevel: { type: "30" }
      }
    }
    return processGMFuelRangeData(test)
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
})

