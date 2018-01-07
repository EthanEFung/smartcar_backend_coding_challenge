/**
 * STILL IN BETA. DO NOT USE
 * An internal error handler. Provide this function with a `res`
 * response stream to send to clients, and a `callback` that performs
 * the desired processes. Upon an error, this function sends notification
 * to the client, and throws an error for internal use.
 * 
 * Notification will be made when error handler is production ready
 * @param {{ send: function }} res 
 * @param {function} callback 
 */
function handleErrors(reject, callback) {
  try {
    callback();
  } catch (e) {
    const internalErr = {
      client_message: 'Error on our end! We need to update our server to our chagrin.',
      status: 500,
      error: e
    };
    reject(internalErr);
    throw internalErr;
  }
}

module.exports = handleErrors;