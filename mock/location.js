const m = require('./mock');

const location = {
  protocol: 'http',
  url: 'localhost',
  path: [
    {
      name: '/api/login',
      mock: m.login,
    },
  ],
};

module.exports = location;
