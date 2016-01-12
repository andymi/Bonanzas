// modulos de node
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// mis modulos del sistema
// var routes = require('./routes/index');
// var users = require('./routes/users');
// las paginas estaticas son las que no necesitan de un controlador orientado a una tabla
var estatico = require('./controllers/estatico');
// el usuario y nivel si necesitan acceder a una base de datos por lo que no puede ser estatico
var usuario = require('./controllers/usuario');
var relevamiento = require('./controllers/relevamiento');
var obra = require('./controllers/obra');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', estatico);
app.use('/api', usuario);
app.use('/api', relevamiento);
app.use('/api', obra);
// catch 404 and forward to error handler
// modulo de control de errores que son generados arriba en el middleware
app.use(function (req, res, next) {
  var err = new Error ('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status (err.status || 500);
    res.render ('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
