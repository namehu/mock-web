const _ = require('lodash');
const Location = require('./location');

const locations = [
  Location,
];

function isSameQuery(reqQuery, pathQuery) {
  if (!pathQuery || _.isEmpty(pathQuery)) return true;
  if (_.isEmpty(reqQuery)) return false;

  let valid = true;
  const pathKeys = Object.keys(pathQuery);
  valid = pathKeys.every((k) => {
    if (reqQuery[k] === undefined) { // 参数值不存在
      return false;
    }
    const pathValue = String(pathQuery[k]);
    if (pathValue.lastIndexOf('$') === -1) { // 参数值全等
      return pathValue === String(reqQuery[k]);
    } else if (pathValue.lastIndexOf('$') === 0) { // 参数值为配置值之中的一个
      const oneOfvalues = pathValue.slice(1).split(',');
      return _.includes(oneOfvalues, String(reqQuery[k]));
    } else if (pathValue.lastIndexOf('$') === 1) { // 参数值不限
      return true;
    }
    return false;
  });
  return valid;
}

module.exports = (app) => {
  locations.forEach((location) => {
    const locationUrl = location.url || '';

    location.path.forEach((path) => {
      app[path.method || 'get'](path.name, (req, res, next) => {
        const reqFullUrl = `${req.protocol}://${req.hostname}${req.path}`;
        const pathUrl = location.protocol === '//' ? `${location.protocol}:${locationUrl}` : `${location.protocol}://${locationUrl}${path.name}`;
        // 域名路径不匹配直接返回下一个中间件
        if (reqFullUrl !== pathUrl) return next();
        // 判断query 是否一致
        if (!isSameQuery(req.query, path.query)) return next();

        if (req.query.callback) {
          res.jsonp(path.mock(req));
        } else {
          res.json(path.mock(req));
        }
        return null;
      });
    });
  });
};
