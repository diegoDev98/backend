"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Carrito = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Carrito = /*#__PURE__*/function () {
  function Carrito() {
    _classCallCheck(this, Carrito);

    this.cart = [];
  }

  _createClass(Carrito, [{
    key: "getAllCartItems",
    value: function getAllCartItems() {
      if (this.cart.length !== 0) {
        return this.cart;
      }

      return -1;
    }
  }, {
    key: "getCartItem",
    value: function getCartItem(id) {
      var product = this.cart.find(function (product) {
        return product.id == id;
      });

      if (product) {
        return product;
      }

      return -1;
    }
  }, {
    key: "addCartItem",
    value: function addCartItem(product) {
      this.cart.push(product);
    }
  }, {
    key: "deleteCartItem",
    value: function deleteCartItem(id) {
      var product = this.cart.find(function (product) {
        return product.id == id;
      });

      if (product) {
        var i = this.cart.indexOf(product);
        this.cart.splice(i, 1);
      }
    }
  }]);

  return Carrito;
}();

exports.Carrito = Carrito;