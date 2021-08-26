"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Carrito = require("../Carrito");

var _index = require("../index");

var _productos = require("./productos");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var cart = new _Carrito.Carrito();
router.get('/listar', function (req, res) {
  var response = cart.getAllCartItems();

  if (response === -1) {
    return res.status(400).json({
      error: 'No hay productos en su carrito'
    });
  }

  res.json(response);
});
router.get('/listar/:id', function (req, res) {
  var id = req.params.id;
  var response = cart.getCartItem(id);

  if (response === -1) {
    return res.status(400).json({
      error: 'Ese producto no esta en su carrito '
    });
  }

  res.json(response);
});
router.post('/agregar/:id_producto', function (req, res) {
  var id_producto = req.params.id_producto;

  var product = _productos.products.getProductById(id_producto);

  if (product === -1) {
    return res.status(400).json({
      error: 'Producto no existe'
    });
  }

  cart.addCartItem(product);
  res.redirect('/');
});
router["delete"]("/borrar/:id", function (req, res) {
  var id = req.params.id;
  var response = cart.getCartItem(id);

  if (response === -1) {
    return res.status(400).json({
      error: 'Ese producto no esta en su carrito '
    });
  }

  cart.deleteCartItem(id);
  res.json(response);
});
var _default = router;
exports["default"] = _default;