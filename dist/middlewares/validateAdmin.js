"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAdmin = void 0;

var validateAdmin = function validateAdmin(req, res, next) {
  var isAdmin = req.body.isAdmin;

  if (!isAdmin) {
    return res.json({
      'error': -1,
      'descripcion': 'No cuenta con los permisos necesarios para realizar esta acción'
    });
  }

  next();
};

exports.validateAdmin = validateAdmin;