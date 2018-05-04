const mock = require('mockjs');

exports.login = () => mock.mock({
  code: 200,
  data: {
    name: '@cname',
    eId: '@cid',
  },
  message: 'login success'
});


exports.register = () => mock.mock({
  code: 200,
  data: 'register success',
});
