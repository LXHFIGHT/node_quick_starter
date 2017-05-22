var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let InitHelper = require('./helpers/InitHelper');

// Routers requirement
let users = require('./routes/users');
let common = require('./routes/common');
let login = require('./routes/login');
let platform = require('./routes/platform/index'); // 如果项目中不涉及到第三方平台的接口请求则可以注释掉此行

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 设置静态访问目录
app.use(express.static(path.join(__dirname, 'public'),{
  setHeaders: (res, path, stat) => {
    if (!process.env.NODE_ENV) {
      res.set('Access-Control-Allow-Origin', '*');
    }
  }
}));

app.all('*', function(req, res, next) {
  if (!process.env.NODE_ENV) {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "authorization");  // 允许验证头 authorization
  next();
});

// TODO： config the router
app.use('/user', users);
app.use('/common', common);
app.use('/platform', platform);  // 如果不包含第三方

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

InitHelper.getWechatAccessTokenInterval();

module.exports = app;
