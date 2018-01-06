const fetch = require('node-fetch');
const handleGMErrors = require('./handleGMErrors');

/**
 * Promise that makes a POST request to the GM API to support
 * GM specifications for GET and POST requests.
 * Returns a promise with a GM Response.
 * IMPORTANT TO NOTE: GM API does not `throw` errors. Response is sent back
 * containing a status code that must be parsed and handled
 * synchronously on our servers. Use this fetch function to handle GM errors
 * @param {string} path
 * @param {{ headers: {}, method: string, body: JSON }} init
 * @param {number} id 
 * @return { Promise }
 */
function fetchGMData(path, init, id) {
  console.log('fetching...');
  return new Promise((resolve, reject) => {
    fetch(path, init)
      .then(res => res.json())
      .then(data => {
        try {
          handleGMErrors(data);
          resolve(data);
        } catch (e) {
          reject(e);
        }
      })
    // .catch(err => reject(err));
  });
}

module.exports = fetchGMData;