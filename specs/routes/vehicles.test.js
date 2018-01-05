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
    it('should send a request to GM');
    it('should request a location for each door from GM');
    it('should request a "locked status" for each door from GM');

    //response from GM
    it('should receive a response from GM API');
    it('should receive a location for each door from GM');
    it('should receive a "locked status" for each door from GM');

    //response to client
    it('should send a response back to the client');
    it('should send a location for each door');
    it('should send a "locked status" for each door');
    it('should send an array');
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