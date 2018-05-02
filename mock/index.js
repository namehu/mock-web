const express = require('express');
const project = require('./project');

const app = express();
const port = 8090;

project(app);

// 未匹配到请求时
app.use((req, res, next) => {
  const urlParse = {
    method: req.method,
    protocol: req.protocol,
    host: req.hostname,
    path: req.path,
    query: req.query,
    params: req.params || null,
  };
  res.json({
    code: 200,
    urlParse,
    message: '未匹配到请求，请检查url是否正确',
  });
  next();
});

app.listen(port, () => {
  console.log(`[INFO] APP START SUCCESSFUL AND LISTEN ON ${port}`);
});
