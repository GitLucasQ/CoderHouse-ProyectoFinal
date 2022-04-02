"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.deleteProduct = exports.addNewProduct = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var fileName = './src/data/productos.txt';

var getAllProducts = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var listOfProducts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 3:
            listOfProducts = _context.sent;
            res.json(listOfProducts === '' ? [] : JSON.parse(listOfProducts));
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error('Sucedio un error:', _context.t0);
            res.send('No se encontraron productos');

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getAllProducts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAllProducts = getAllProducts;

var getProductById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, listOfProducts, foundedProduct;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 4:
            listOfProducts = _context2.sent;
            foundedProduct = JSON.parse(listOfProducts).find(function (product) {
              return product.id === parseInt(id);
            });
            res.json(foundedProduct);
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.error('Sucedio un error:', _context2.t0);
            res.send('No se encontraron productos');

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function getProductById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getProductById = getProductById;

var addNewProduct = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, nombre, descripcion, codigo, url, precio, stock, newId, listOfProducts, listParsed, lastId;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, descripcion = _req$body.descripcion, codigo = _req$body.codigo, url = _req$body.url, precio = _req$body.precio, stock = _req$body.stock;
            newId = 0;
            _context3.prev = 2;
            _context3.next = 5;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 5:
            listOfProducts = _context3.sent;
            listParsed = listOfProducts === '' ? [] : JSON.parse(listOfProducts);

            if (listParsed.length === 0) {
              newId = 1;
            } else {
              lastId = Math.max.apply(Math, (0, _toConsumableArray2["default"])(listParsed.map(function (product) {
                return product.id;
              })));
              newId = lastId += 1;
            }

            listParsed.push({
              id: newId,
              timestamp: Date.now(),
              nombre: nombre,
              descripcion: descripcion,
              codigo: codigo,
              url: url,
              precio: precio,
              stock: stock
            });
            _context3.next = 11;
            return _fs["default"].promises.writeFile(fileName, JSON.stringify(listParsed, null, 2));

          case 11:
            res.send('Producto agregado con éxito');
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);
            console.error('Sucedio un error:', _context3.t0);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 14]]);
  }));

  return function addNewProduct(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addNewProduct = addNewProduct;

var updateProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, nombre, descripcion, codigo, url, precio, stock, listOfProducts, indexProduct;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, nombre = _req$body2.nombre, descripcion = _req$body2.descripcion, codigo = _req$body2.codigo, url = _req$body2.url, precio = _req$body2.precio, stock = _req$body2.stock;
            _context4.prev = 2;
            _context4.t0 = JSON;
            _context4.next = 6;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 6:
            _context4.t1 = _context4.sent;
            listOfProducts = _context4.t0.parse.call(_context4.t0, _context4.t1);
            indexProduct = listOfProducts.findIndex(function (product) {
              return product.id === parseInt(id);
            });

            if (!(indexProduct === -1)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.send('Producto no encontrado'));

          case 11:
            listOfProducts[indexProduct] = {
              id: id,
              timestamp: Date.now(),
              nombre: nombre,
              descripcion: descripcion,
              codigo: codigo,
              url: url,
              precio: precio,
              stock: stock
            };
            _context4.next = 14;
            return _fs["default"].promises.writeFile(fileName, JSON.stringify(listOfProducts, null, 2));

          case 14:
            res.send('Producto actualizado con éxito');
            _context4.next = 21;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t2 = _context4["catch"](2);
            console.error('Sucedio un error:', _context4.t2);
            res.send('No se encontraron productos');

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 17]]);
  }));

  return function updateProduct(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateProduct = updateProduct;

var deleteProduct = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, listOfProducts, newList;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.t0 = JSON;
            _context5.next = 5;
            return _fs["default"].promises.readFile(fileName, 'utf-8');

          case 5:
            _context5.t1 = _context5.sent;
            listOfProducts = _context5.t0.parse.call(_context5.t0, _context5.t1);
            newList = listOfProducts.filter(function (product) {
              return product.id != parseInt(id);
            });
            _context5.next = 10;
            return _fs["default"].promises.writeFile(fileName, JSON.stringify(newList, null, 2));

          case 10:
            res.send('Producto eliminado con éxito');
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t2 = _context5["catch"](1);
            console.error('Sucedio un error:', _context5.t2);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 13]]);
  }));

  return function deleteProduct(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteProduct = deleteProduct;