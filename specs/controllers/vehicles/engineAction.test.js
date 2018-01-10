import {
  engineAction,
  parseEngineActionRequest,
  parseEngineActionResponse,
  processGMEngineActionData
} from '../../../server/controllers/vehicles/engineAction';

import { fakeReq, fakeRes } from '../../__mocks__/fakeStreams';
import fakeGMFetch from '../../__mocks__/fakeGMFetch';

import { badRequest } from '../../../server/helpers/ErrorResponses';

describe('engineAction functionality', () => {
  it('should have a controller', () => {
    expect(engineAction).toBeTruthy();
  });

  it('should send some data', () => {
    expect.assertions(1);
    return engineAction(fakeReq, fakeRes, () => { }, fakeGMFetch)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

  it('should send a proper response', () => {
    expect.assertions(1);
    return engineAction(fakeReq, fakeRes, null, fakeGMFetch)
      .then(data => {
        expect(data).toEqual({
          status: 'success'
        });
      });
  });

  it('should throw if the params does not have a valid id', () => {
    expect.assertions(1);
    return engineAction({ params: { id: 1237 }, body: { action: 'START' } }, fakeRes, () => { }, fakeGMFetch)
      .then(err => {
        expect(err).toEqual({ status: '404', reason: 'Vehicle id: 1237 not found.' });
      });
  });

});

describe('parseEngineActionRequest', () => {
  it('should return "START_VEHICLE" if the action is "START"', () => {
    expect(parseEngineActionRequest('START')).toBe('START_VEHICLE');
  });

  it('should return "STOP_VEHICLE" if the action is "STOP"', () => {
    expect(parseEngineActionRequest('STOP')).toBe('STOP_VEHICLE');
  });

  it('should throw if the action has the word start or stop but is not formatted', () => {
    expect.assertions(1);
    try {
      parseEngineActionRequest('START ');
    } catch (e) {
      expect(e).toEqual(badRequest);
    }
  });
});

describe('processGMEngineActionData', () => {
  it('should resolve if given a correctly formatted response', () => {
    expect.assertions(2);

    const test = {
      service: 'actionEngine',
      status: '200',
      actionResult: {
        status: 'EXECUTED'
      }
    }

    processGMEngineActionData(test)
      .then(data => expect(data).toEqual({ status: 'success' }))

    const test2 = {
      service: 'actionEngine',
      status: '200',
      actionResult: {
        status: 'FAILED'
      }
    }

    return processGMEngineActionData(test2)
      .then(data => expect(data).toEqual({ status: 'error' }))
  });

  it('resolves with an object', () => {
    expect.assertions(1);
    const test = {
      actionResult: {
        status: 'EXECUTED'
      }
    }

    return processGMEngineActionData(test)
      .then(data => expect(typeof data).toBe('object'));
  });

  it('resolves with a status', () => {
    expect.assertions(1);
    const test = {
      actionResult: {
        status: 'EXECUTED'
      }
    }

    return processGMEngineActionData(test)
      .then(data => expect(data.status).toBeTruthy());
  });

  it('resolves with a status of "success" if passed "EXECUTED"', () => {
    expect.assertions(1);
    const test = {
      actionResult: {
        status: 'EXECUTED'
      }
    }

    return processGMEngineActionData(test)
      .then(data => expect(data.status).toBe('success'));
  });

  it('resolves with a status of "error" if passed "FAILED"', () => {
    expect.assertions(1);
    const test = {
      actionResult: {
        status: 'FAILED'
      }
    }

    return processGMEngineActionData(test)
      .then(data => expect(data.status).toBe('error'));
  });

  it('should throw an error if the GM response is empty', () => {
    expect.assertions(1);
    const internalErr = new Error(
      JSON.stringify({
        "client_message": "Error on our end! We need to update our server to our chagrin.",
        "error": TypeError(`Cannot read property 'status' of undefined`),
        "status": 500
      })
    )

    return processGMEngineActionData({})
      .catch(err => expect(err).toEqual(internalErr));
  });

  it('should throw an error if the GM response is doesnt have an actionResult obj', () => {
    expect.assertions(1);
    const internalErr = new Error(
      JSON.stringify({
        "client_message": "Error on our end! We need to update our server to our chagrin.",
        "error": TypeError(`Cannot read property 'status' of undefined`),
        "status": 500
      })
    )

    return processGMEngineActionData({ someOtherAttr: {} })
      .catch(err => expect(err).toEqual(internalErr));
  });

  it('should throw an error if the actionResult object is doesnt have a status', () => {
    expect.assertions(1);
    const internalErr = new Error(
      JSON.stringify({
        "client_message": "Error on our end! We need to update our server to our chagrin.",
        "error": "status needs to be updated to support \"undefined\"",
        "status": 500
      })
    )

    return processGMEngineActionData({
      service: 'actionEngine',
      status: '400',
      actionResult: {
        type: "String"
      }
    })
      .catch(err => expect(err).toEqual(internalErr));
  });
})

describe('parseEngineActionResponse', () => {
  it('should return "success" if the status is "EXECUTED"', () => {
    expect(parseEngineActionResponse('EXECUTED')).toBe('success');
  });

  it('should return "error" if the action is "FAILED"', () => {
    expect(parseEngineActionResponse('FAILED')).toBe('error');
  });

  it('should throw if the action has the word start or stop but is not formatted', () => {
    try {
      parseEngineActionResponse('EXECUTEDS');
    } catch (e) {
      expect(e).toEqual(`status needs to be updated to support "EXECUTEDS"`);
    }
  });
})