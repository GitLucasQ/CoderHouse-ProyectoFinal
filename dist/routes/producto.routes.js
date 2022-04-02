"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var productController = _interopRequireWildcard(require("../controllers/producto.controller"));

var _validateAdmin = require("../middlewares/validateAdmin");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var productRouter = _express["default"].Router();

exports.productRouter = productRouter;
productRouter.get('/api/productos', productController.getAllProducts);
productRouter.get('/api/productos/:id', productController.getProductById);
productRouter.post('/api/productos', _validateAdmin.validateAdmin, productController.addNewProduct);
productRouter.put('/api/productos/:id', _validateAdmin.validateAdmin, productController.updateProduct);
productRouter["delete"]('/api/productos/:id', _validateAdmin.validateAdmin, productController.deleteProduct);