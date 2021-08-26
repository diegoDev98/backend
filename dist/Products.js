"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Products = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Products = /*#__PURE__*/function () {
  function Products() {
    _classCallCheck(this, Products);

    this.products = [];
  }

  _createClass(Products, [{
    key: "getAllProducts",
    value: function getAllProducts() {
      if (this.products.length !== 0) {
        return this.products;
      }

      return -1;
    }
  }, {
    key: "getProductById",
    value: function getProductById(id) {
      var product = this.products.find(function (product) {
        return product.id == id;
      });

      if (product) {
        return product;
      }

      return -1;
    }
  }, {
    key: "addProduct",
    value: function addProduct(name, price, thumbnail, stock, description) {
      console.log(this.products);
      this.products.push({
        name: name,
        price: price,
        description: description,
        stock: stock,
        thumbnail: thumbnail,
        id: this.products.length + 1,
        timestamp: Date.now(),
        code: '#' + Math.floor(Math.random() * 100000) + 1
      });
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(id) {
      var product = this.products.find(function (product) {
        return product.id == id;
      });

      if (product) {
        var i = this.products.indexOf(product);
        this.products.splice(i, 1);
      }
    }
  }]);

  return Products;
}();

exports.Products = Products;