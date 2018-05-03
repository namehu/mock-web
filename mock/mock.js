const mock = require('mockjs');

exports.login = () => mock.mock({
  code: 200,
  data: 'success',
});


exports.register = () => mock.mock({
  code: 200,
  data: 'register success',
});
