import { batteryRange, processGMBatteryRangeData } from '../../../server/controllers/vehicles/batteryRange';

describe('batteryRange functionality', () => {
  it('should have a controller', () => {
    expect(batteryRange).toBeTruthy();
  });
});

describe('processGMBatteryRangeData', () => {
  it('should have a promise that processes GM responses', () => {
    expect(processGMBatteryRangeData).toBeTruthy();
  });

  it('Returns if provided with a correctly formatted response', () => {
    expect.assertions(1);
    const test = {
      data: {
        batteryLevel: { value: "30" }
      }
    }
    return processGMBatteryRangeData(test)
      .then(data => {
        expect(data).toEqual({ percent: 30 })
      });
  });

  it('Returns an Error if no arguments are provided', () => {
    expect.assertions(2);
    return processGMBatteryRangeData()
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
    return processGMBatteryRangeData(test)
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

  it('Returns an Error if the "data" object doesnt have a "batteryLevel"', () => {
    expect.assertions(2);
    const test = {
      data: {
        tankLevel: { value: "30" }
      }
    }
    return processGMBatteryRangeData(test)
      .catch(err => {
        const internalErr = new Error(
          JSON.stringify({
            client_message: 'Error on our end! We need to update our server to our chagrin.',
            status: 500,
            error: {}
          })

        );
        expect(err).toBeInstanceOf(Error);
        expect(err).toEqual(internalErr);
      });
  });

  it('Returns an Error if the "batteryLevel" object doesnt have a "value"', () => {
    expect.assertions(2);
    const test = {
      data: {
        batteryLevel: { type: "30" }
      }
    }
    return processGMBatteryRangeData(test)
      .then(data => console.log(data))
      .catch(err => {
        const internalErr = new Error(
          JSON.stringify({
            client_message: 'Error on our end! We need to update our server to our chagrin.',
            status: 500,
            error: "GM format change"
          })
        );
        expect(err).toBeInstanceOf(Error);
        expect(err).toEqual(internalErr);
      });
  });
})
