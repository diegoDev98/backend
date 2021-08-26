"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.administrador = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _productos = _interopRequireDefault(require("./routes/productos.js"));

var _carrito = _interopRequireDefault(require("./routes/carrito.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var administrador = true;
exports.administrador = administrador;
var port = 3000;
var app = (0, _express["default"])();

var publicPath = _path["default"].resolve(__dirname, "../public");

app.use(_express["default"]["static"](publicPath));

var viewsPath = _path["default"].resolve(__dirname, "../views");

app.set("view engine", "pug");
app.set("views", viewsPath);
var server = app.listen(port, function () {
  console.log('server up en puerto', port);
});
server.on('error', function (err) {
  console.log('ERROR =>', err);
});
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use("/api/productos", _productos["default"]);
app.use("/api/carrito", _carrito["default"]);