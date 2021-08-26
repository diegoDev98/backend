"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.products = void 0;

var _express = _interopRequireDefault(require("express"));

var _Products = require("../Products");

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var products = new _Products.Products();
exports.products = products;
router.get('/listar/:id', function (req, res) {
  var id = req.params.id;
  var response = products.getProductById(id);

  if (response === -1) {
    return res.status(400).json({
      error: 'no existe el id '
    });
  }

  res.json(response);
});
router.get('/listar', function (req, res) {
  var response = products.getAllProducts();

  if (response === -1) {
    return res.status(400).json({
      error: 'No hay productos cargados'
    });
  }

  res.json(response);
});
router.post('/agregar', function (req, res) {
  if (_index.administrador === true) {
    var _req$body = req.body,
        name = _req$body.name,
        price = _req$body.price,
        thumbnail = _req$body.thumbnail,
        stock = _req$body.stock,
        description = _req$body.description;
    var body = req.body;
    var numeroConvertido = Number(body.price);

    if (!name || !price || !thumbnail || !stock || !description || !numeroConvertido) {
      return res.status(400).json({
        error: 'Deben ingresar name: string ,price: number , thumbnail: string , stock:number, description: string'
      });
    }

    products.addProduct(name, price, thumbnail, stock, description);
    res.redirect('/');
  } else {
    return res.status(400).json({
      error: 'No es administrador'
    });
  }
});
router.put("/actualizar/:id", function (req, res) {
  if (_index.administrador === true) {
    var id = req.params.id;
    var body = req.body;
    var response = products.getProductById(id);

    if (response === -1) {
      return res.status(400).json({
        error: 'no existe el id ' + id
      });
    }

    var numeroConvertido = Number(body.price);

    if (!numeroConvertido || !body.name || !body.price || !body.thumbnail || !body.stock || !body.description || typeof body.name != "string" || typeof body.thumbnail != "string" || typeof body.price != "number" || typeof body.stock != "number" || typeof body.description != "string") {
      res.status = 400;
      return res.json({
        msg: "necesito el name: string, price: number y thumbnail: string"
      });
    }

    response.name = body.name;
    response.price = body.price;
    response.thumbnail = body.thumbnail;
    response.stock = body.stock;
    response.description = body.description;
    res.json(response);
  } else {
    return res.status(400).json({
      error: 'No es administrador'
    });
  }
});
router["delete"]("/borrar/:id", function (req, res) {
  if (_index.administrador === true) {
    var id = req.params.id;
    var response = products.getProductById(id);

    if (!response) {
      return res.status(400).json({
        error: 'no existe el id ' + id
      });
    }

    products.deleteProduct(id);
    res.json(response);
  } else {
    return res.status(400).json({
      error: 'No es administrador'
    });
  }
});
var _default = router;
exports["default"] = _default;