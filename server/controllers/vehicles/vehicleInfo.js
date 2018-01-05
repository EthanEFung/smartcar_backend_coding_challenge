// it('should receive a GET request from the client');
// it('should receive the id of the client in the params');

// //request to GM
// it('should send a POST request to GM');
// it('should send the id of the client in the requests body');
// it('should specify a responseType of "JSON" in the requests body');

// //response from GM
// it('should receive a response from GM API');
// it('should receive a "data" attribute')
// it('should receive a vin number from GM');
// it('should receive a color from GM');
// it('should receive a "fourDoorSedan" status from GM');
// it('should receive a "twoDoorCoupe" status from GM');
// it('should receive a driveTrain from GM');

// //response to client
// it('should send a response back to the client');
// it('should send a vin number');
// it('should send a color');
// it('should send a doorCount');
// it('should send a driveTrain');
// it('should send a single object')

/**
 * route controller that handles GET requests for a given information.
 * Sends to the client a JSON object that 
 * @param {{ params: { id: number } }} req - a readable stream that contains an id param
 * @param {{ body: { vin: string, color: string, doorCount: number, driveTrain: string } }} res - a writeable stream that is sent to the client
 */
function vehicleInfo(req, res) {

}

module.exports = vehicleInfo;