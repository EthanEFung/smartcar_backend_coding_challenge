
/**
 * TODO
 * @param {*} response 
 */
function handleGMErrors(response) {
  if (response.status[0] === '3') {
    throw new Error('Redirection');
  }
  if (response.status[0] === '4') {
    throw new Error('Client Error');
  }
  if (response.status[0] === '5') {
    throw new Error('GM Server Error');
  }
}

module.exports = handleGMErrors;