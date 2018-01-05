describe('vehicleInfo', () => {
  //request to GM
  it('should send a POST request to GM');
  it('should send the id of the client in the requests body');
  it('should specify a responseType of "JSON" in the requests body');

  //response from GM
  it('should receive a response from GM API');
  it('should receive a "data" attribute');
  it('should receive a vin number from GM');
  it('should receive a color from GM');
  it('should receive a "fourDoorSedan" status from GM');
  it('should receive a "twoDoorCoupe" status from GM');
  it('should receive a driveTrain from GM');
});