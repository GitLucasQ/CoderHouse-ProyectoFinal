"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _producto = require("./routes/producto.routes");

var _carrito = require("./routes/carrito.routes");

var app = (0, _express["default"])();
var PORT = process.env.PORT || 8080;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
})); // ROUTES

app.use(_producto.productRouter);
app.use(_carrito.carritoRouter);
app.use(function (req, res) {
  res.status(404).json({
    'error': -2,
    'descripcion': 'Ruta no existente'
  });
});
app.listen(PORT, function () {
  console.log('Server online on port', PORT);
});