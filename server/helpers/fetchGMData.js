const fetch = require('node-fetch');

/**
 * Promise that makes a POST request to the GM API.
 * Returns a promise with a GM Response.
 * To Note: GM API does not throw errors
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
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

module.exports = fetchGMData;