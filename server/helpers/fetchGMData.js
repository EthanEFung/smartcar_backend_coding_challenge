const fetch = require('node-fetch');

function fetchGMData(path, init, id) {
  console.log('fetching...')
  return new Promise((resolve, reject) => {
    fetch(path, init)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

module.exports = fetchGMData;