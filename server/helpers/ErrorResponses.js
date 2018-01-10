const badRequest = JSON.stringify({
  error: 'bad request please check the request body or params for specifications',
  status: 400
});

module.exports = { badRequest }