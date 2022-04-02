"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllProducts = exports.deleteShopCart = exports.deleteProductById = exports.createNewShopCart = exports.addNewProduct = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var fileName = './src/data/carrito.txt';

var createNewShopCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, nombre, descripcion, codigo, url, precio, stock, newShopCartId, listOfShopCart, listParsed, lastId;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, descripcion = _req$body.descripcion, codigo = _req$body.codigo, url = _req$body.url, precio = _req$body.precio, stock = _req$body.stock;
            newShopCartId = 0;
            _context.prev = 2;
            _context.next = 5;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 5:
            listOfShopCart = _context.sent;
            listParsed = listOfShopCart === '' ? [] : JSON.parse(listOfShopCart);

            if (listParsed.length === 0) {
              newShopCartId = 1;
            } else {
              lastId = Math.max.apply(Math, (0, _toConsumableArray2["default"])(listParsed.map(function (shopcart) {
                return shopcart.id;
              })));
              newShopCartId = lastId += 1;
            }

            listParsed.push({
              id: newShopCartId,
              timestamp: Date.now(),
              productos: [{
                id: 1,
                timestamp: Date.now(),
                nombre: nombre,
                descripcion: descripcion,
                codigo: codigo,
                url: url,
                precio: precio,
                stock: stock
              }]
            });
            _context.next = 11;
            return _fs["default"].promises.writeFile(fileName, JSON.stringify(listParsed, null, 2));

          case 11:
            res.json({
              id: newShopCartId
            });
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);
            console.error('Sucedio un error:', _context.t0);
            res.send('No se pudo crear el carrito');

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 14]]);
  }));

  return function createNewShopCart(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createNewShopCart = createNewShopCart;

var deleteShopCart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, listOfShopCarts, newList;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.t0 = JSON;
            _context2.next = 5;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 5:
            _context2.t1 = _context2.sent;
            listOfShopCarts = _context2.t0.parse.call(_context2.t0, _context2.t1);
            newList = listOfShopCarts.filter(function (shopcart) {
              return shopcart.id != parseInt(id);
            });
            _context2.next = 10;
            return _fs["default"].promises.writeFile(fileName, JSON.stringify(newList, null, 2));

          case 10:
            res.send('Carrito eliminado con éxito');
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t2 = _context2["catch"](1);
            console.error('Sucedio un error:', _context2.t2);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 13]]);
  }));

  return function deleteShopCart(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteShopCart = deleteShopCart;

var getAllProducts = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, _listOfShopCart$filte, listOfShopCart, products;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.t0 = JSON;
            _context3.next = 5;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 5:
            _context3.t1 = _context3.sent;
            listOfShopCart = _context3.t0.parse.call(_context3.t0, _context3.t1);
            products = (_listOfShopCart$filte = listOfShopCart.filter(function (shopcart) {
              return shopcart.id === parseInt(id);
            })[0]) === null || _listOfShopCart$filte === void 0 ? void 0 : _listOfShopCart$filte.productos;
            res.json({
              'productos': products
            });
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t2 = _context3["catch"](1);
            console.error('Sucedio un error:', _context3.t2);
            res.send('No se encontraron productos');

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));

  return function getAllProducts(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAllProducts = getAllProducts;

var addNewProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, nombre, descripcion, codigo, url, precio, stock, newId, _listOfShopCarts$filt, _listOfShopCarts$filt2, listOfShopCarts, products, lastId;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, nombre = _req$body2.nombre, descripcion = _req$body2.descripcion, codigo = _req$body2.codigo, url = _req$body2.url, precio = _req$body2.precio, stock = _req$body2.stock;
            newId = 0;
            _context4.prev = 3;
            _context4.t0 = JSON;
            _context4.next = 7;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 7:
            _context4.t1 = _context4.sent;
            listOfShopCarts = _context4.t0.parse.call(_context4.t0, _context4.t1);
            products = (_listOfShopCarts$filt = listOfShopCarts.filter(function (shopcart) {
              return shopcart.id === parseInt(id);
            })[0]) === null || _listOfShopCarts$filt === void 0 ? void 0 : _listOfShopCarts$filt.productos;
            lastId = Math.max.apply(Math, (0, _toConsumableArray2["default"])(products.map(function (product) {
              return product.id;
            })));
            newId = lastId += 1;
            (_listOfShopCarts$filt2 = listOfShopCarts.filter(function (shopcart) {
              return shopcart.id === parseInt(id);
            })[0]) === null || _listOfShopCarts$filt2 === void 0 ? void 0 : _listOfShopCarts$filt2.productos.push({
              id: newId,
              timestamp: Date.now(),
              nombre: nombre,
              descripcion: descripcion,
              codigo: codigo,
              url: url,
              precio: precio,
              stock: stock
            });
            _context4.next = 15;
            return _fs["default"].promises.writeFile(fileName, JSON.stringify(listOfShopCarts, null, 2));

          case 15:
            res.send('Producto agregado con éxito');
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t2 = _context4["catch"](3);
            console.error('Sucedio un error:', _context4.t2);
            res.send('Carrito no encontrado');

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 18]]);
  }));

  return function addNewProduct(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.addNewProduct = addNewProduct;

var deleteProductById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$params, id, id_prod, listOfShopCarts, products;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, id_prod = _req$params.id_prod;
            _context5.prev = 1;
            _context5.t0 = JSON;
            _context5.next = 5;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 5:
            _context5.t1 = _context5.sent;
            listOfShopCarts = _context5.t0.parse.call(_context5.t0, _context5.t1);
            products = listOfShopCarts.find(function (shopcart) {
              return shopcart.id === parseInt(id);
            }).productos;

            if (!(products.find(function (product) {
              return product.id === parseInt(id_prod);
            }) === undefined)) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.send('No se encontraron productos'));

          case 10:
            products = products.filter(function (product) {
              return product.id != parseInt(id_prod);
            });
            listOfShopCarts.find(function (shopcart) {
              return shopcart.id === parseInt(id);
            }).productos = products;
            _context5.next = 14;
            return _fs["default"].promises.writeFile(fileName, JSON.stringify(listOfShopCarts, null, 2));

          case 14:
            res.send('Producto eliminado con éxito');
            _context5.next = 20;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t2 = _context5["catch"](1);
            console.error('Sucedio un error:', _context5.t2);

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 17]]);
  }));

  return function deleteProductById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteProductById = deleteProductById;