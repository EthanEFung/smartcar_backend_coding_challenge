describe('the vehicle router', () => {
  it('should have one test', () => {
    expect(true).toBe(true);
  });

  describe('/:id', () => {
    //request from client
    it('should receive a request from the client');
    it('should receive the id of the client in the params');

    //request to GM
    it('should send a request to GM');
    it('should request a vin number from GM');
    it('should request a color from GM');
    it('should request a doorCount from GM');
    it('should request a driveTrain from GM');

    //response from GM
    it('should receive a response from GM API');
    it('should receive a vin number from GM');
    it('should receive a color from GM');
    it('should receive a doorCount from GM');
    it('should receive a driveTrain from GM');

    //response to client
    it('should send a response back to the client');
    it('should send a vin number from GM');
    it('should send a color from GM');
    it('should send a doorCount from GM');
    it('should send a driveTrain from GM');
    it('should send a single object')
  });

  describe('/:id/doors', () => {
    //request from client
    it('should receive a request from the client');
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
    it('should send a location for each door from GM');
    it('should send a "locked status" for each door from GM');
    it('should send an array')
  });

  describe('/:id/fuel', () => {
    it('should receive a request from the client');
    it('should send a request to GM API');
    it('should receive a response from GM API');
    it('should send a response back to the client');
  });

  describe('/:id/battery', () => {
    it('should receive a request from the client')
    it('should send a request to GM API');
    it('should receive a response from GM API');
    it('should send a response back to the client');
  });

  describe('/:id/engine', () => {
    it('should receive a request from the client')
    it('should send a request to GM API');
    it('should receive a response from GM API');
    it('should send a response back to the client');
  });
})