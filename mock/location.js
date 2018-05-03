const m = require('./mock');

const location = {
  protocol: 'http',
  url: 'localhost',
  path: [
    {
      name: '/api/login',
      mock: m.login,
      method: 'post',
      body: {
        username: '$$',
        password: '$$',
      }
    },
  ],
};

module.exports = location;