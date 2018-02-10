var express = require('express');
var app = express();
app.get('/',function (request, response) {
  response.send('hello world');
});

app.route('/usuarios')
.get(function (request, response) {
  response.send('accediendo a usuarios con el metodo get');
})
.post(function (request, response) {
  response.send('accediendo a usuarios con el metodo post');
})
.put(function (request, response) {
  response.send('accediendo a usuarios con el metodo put');
})
.delete(function (request, response) {
  response.send('accediendo a usuarios con el metodo delete');
});

app.listen(3000,function () {
  console.log('corriendo en el puerto 3000');
});