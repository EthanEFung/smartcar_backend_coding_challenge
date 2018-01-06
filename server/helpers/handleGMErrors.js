
/**
 * 
 * @param {*} response 
 */
function handleGMErrors(response) {
  const type = response.status[0];
  if (type >= '3' && type <= '5') {
    throw response;
  }
}

module.exports = handleGMErrors;