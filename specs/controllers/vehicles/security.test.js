import { security, processGMSecurityData, processLockedStatus } from '../../../server/controllers/vehicles/security';

import { fakeReq, fakeRes } from '../../__mocks__/fakeStreams';
import fakeGMFetch from '../../__mocks__/fakeGMFetch';
import GMgetSecurityStatusResponse from '../../__mocks__/GMgetSecurityStatusResponse';

import { badRequest } from '../../../server/helpers/ErrorResponses';


describe('security controller functionality', () => {
  it('should have a controller', () => {
    expect.assertions(1);
    expect(security).toBeTruthy();
  });

  it('should send some data', () => {
    expect.assertions(1);
    return security(fakeReq, fakeRes, null, fakeGMFetch)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

  it('should send a proper response', () => {
    expect.assertions(1);
    return security(fakeReq, fakeRes, null, fakeGMFetch)
      .then(data => {
        expect(data).toEqual([
          {
            "location": "frontLeft",
            "locked": false
          },
          {
            "location": "frontRight",
            "locked": true
          }
        ]);
      });
  });

  it('should throw if the params does not have a valid id', () => {


    expect.assertions(1);
    return security({ params: { id: 1237 } }, fakeRes, null, fakeGMFetch)
      .then(err => {
        expect(err).toEqual({ status: '404', reason: 'Vehicle id: 1237 not found.' });
      })
  });

});

describe('processGMSecurityData', () => {
  it('should resolve if given a correctly formatted response', () => {
    expect.assertions(1);

    const test = GMgetSecurityStatusResponse;

    return processGMSecurityData(test)
      .then(data => expect(data).toEqual([
        {
          "location": "frontLeft",
          "locked": false
        },
        {
          "location": "frontRight",
          "locked": true
        }
      ]))

  });

  it('resolves with an object', () => {
    expect.assertions(1);
    const test = GMgetSecurityStatusResponse;

    return processGMSecurityData(test)
      .then(data => expect(typeof data).toBe('object'));
  });

  it('resolves as an array', () => {
    expect.assertions(1);
    const test = GMgetSecurityStatusResponse

    return processGMSecurityData(test)
      .then(data => {
        expect(data).toBeInstanceOf(Array)
      })

  });

  it('should throw an error if the GM response is empty', () => {
    expect.assertions(1);
    const internalErr = new Error(
      JSON.stringify({
        "client_message": "Error on our end! We need to update our server to our chagrin.",
        "status": 500,
        "error": TypeError(`Cannot read property 'status' of undefined`),
      })
    )

    return processGMSecurityData({})
      .catch(err => expect(err).toEqual(internalErr));
  });
});

describe('processLockedStatus', () => {
  it('accepts only an object', () => {
    expect.assertions(1);
    const test = processLockedStatus({
      location: { type: 'String', value: 'frontLeft' },
      locked: { type: 'String', value: 'True' }
    })
    expect(test).toBe(true);
  });
});

