const fakeReq = { params: { id: 1234 }, body: { action: 'START' } };
const fakeRes = {
  send: function (data) {
    return new Promise((resolve, reject) => {
      resolve(data);
    })
  }
}

export { fakeReq, fakeRes }