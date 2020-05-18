var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
//var config = require('./webpack.config');
//var webpack = require('webpack');
//var webpackDevMiddleWare = require('webpack-dev-middleware');
require('./config');




var passport = require('passport');
var flash = require('connect-flash');
const passportSetup = require('./api/config/passport-setup');




var userRoutes = require('./api/routes/users');
var authRoutes = require('./api/routes/authentication');
var sportsRoutes = require('./api/routes/sports');
var loggedInCheck = require('./middleware/isLoggedIn');
var uiRoutes = require('./api/routes/ui');

var app = express();
app.use(cors({origin : 'http://54.185.204.216/',credentials: true}));

//Run config inside wepack 
/*const compiler = webpack(config);
app.use(webpackDevMiddleWare(compiler));*/



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(loggedInCheck);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/dist')));

app.use("/api/users", userRoutes);
app.use("/api/authentication", authRoutes);
app.use("/api/sports", sportsRoutes);
app.use("/api/ui", uiRoutes);

// catch 404 and forward to error handler



app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// port = process.env.PORT || 3000;

// app.listen(port,() => {
//   console.log("server is running on port "+port);
// })
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});

//module.exports = app;
