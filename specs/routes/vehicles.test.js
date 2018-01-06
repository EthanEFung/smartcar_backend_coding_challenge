describe('the vehicle router', () => {
  describe('/:id', () => {
    //request from client
    it('should receive a GET request from the client');
    it('should receive the id of the client in the params');

    //response to client
    it('should send a response back to the client');
    it('should send a vin number');
    it('should send a color');
    it('should send a doorCount');
    it('should send a driveTrain');
    it('should send a single object')
  });

  describe('/:id/doors', () => {
    //request from client
    it('should receive a GET request from the client');
    it('should receive the id of the client in the params');

    //request to GM
    it('should send a POST request to GM');
    it('should send the clients id in the body of the request to GM');
    it('should specify the responseType to be JSON in the body of the request');

    //response from GM
    it('should receive a response from GM API');
    it('should receive a "data" object from GM');
    it('has the "doors" object nested in the data object');
    it('has the "values" array nested in the doors object');
    it('has door objects for each door, which store location and locked');
    it('has a value attribute for each door location');
    it('has a value attribute for each door\'s "locked" status')

    //response to client
    it('should send a response back to the client');
    it('should send an array to the client');
    it('should send an object for each door location to the client');
    it('should send a "locked status" for each door to the client');
    it('should send a location for each door to the client');
  });

  describe('/:id/fuel', () => {
    //request from client
    it('should receive a GET request from the client');
    it('should receive the id of the client in the params');

    //request to GM
    it('should send a request to GM');
    it('should request the percentage of fuel left');

    //response from GM
    it('should receive a response from GM API');
    it('should receive the percentage of fuel left from GM');

    //response to client
    it('should send a response back to the client');
    it('should send the percentage of fuel left');
    it('should send an object');
  });

  describe('/:id/battery', () => {
    //request from client
    it('should receive a GET request from the client');
    it('should receive the id of the client in the params');

    //request to GM
    it('should send a request to GM');
    it('should request the percentage of battery left');

    //response from GM
    it('should receive a response from GM API');
    it('should receive the percentage of battery left from GM');

    //response to client
    it('should send a response back to the client');
    it('should send the percentage of battery left');
    it('should send an object');
  });

  describe('/:id/engine', () => {
    //request from client
    it('should receive a POST request from the client');
    it('should receive the "action" of the client in the request body');

    //request to GM
    it('should send a POST request to GM');
    it('should request given action');

    //response from GM
    it('should receive a response from GM API');
    it('should receive a status of the cars engine');

    //response to client
    it('should send a response back to the client');
    it('should send a status of the cars engine');
    it('should send an object');
  });
})