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
    {
      name: '/api/register',
      mock: m.register,
      method: 'post',
      body: {
        userName: '$$',
        password: '$$',
      },
    }
  ],
};

module.exports = location;
