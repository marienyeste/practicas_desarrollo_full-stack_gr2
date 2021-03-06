//Importación de dependencias:
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
var personasRouter = require('./routes/personas-routes');

//Creación de la aplicación
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*Se configura el módulo para generar un log de las peticiones 
que recibe el servidor y verlas por la consola:*/
app.use(logger('dev'));

/*Se configura un middleware para que traduzca todas las peticiones 
de tipo JSON para facilitar su tratamiento. */
app.use(express.json());

/*middleware para decodificar el contenido de los parámetros que 
vengan codificados en las peticiones*/
app.use(express.urlencoded({
    extended: false
}));

//módulo para facilitar el tratamiento de cookies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//se definen las rutas de la aplicación
// app.use('/', indexRouter);
app.use('/', personasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*se exporta la aplicación para que pueda ser utilizada desde otros 
ficheros que incluyan app.js:*/
module.exports = app;