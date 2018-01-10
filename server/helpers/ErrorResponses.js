/**
 * a request that be used to notify clients of insufficient, or ill-formatted information
 */
const badRequest = JSON.stringify({
  error: 'bad request please check the request body or params for specifications',
  status: 400
});

module.exports = { badRequest }