
/**
 * Receives a response from GM, and parses the status type.
 * Throws when response is not successful.
 * @param { Promise } response 
 */
function handleGMErrors(response) {
  // console.log(response)
  const type = response.status[0];
  if (type >= '3' && type <= '5') {
    throw response;
  }
}

module.exports = handleGMErrors;