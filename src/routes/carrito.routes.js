import express from 'express';
import * as carritoController from '../controllers/carrito.controller'

export const carritoRouter = express.Router()

carritoRouter.post('/api/carrito', carritoController.createNewShopCart)
carritoRouter.delete('/api/carrito/:id', carritoController.deleteShopCart)
carritoRouter.get('/api/carrito/:id/productos', carritoController.getAllProducts)
carritoRouter.post('/api/carrito/:id/productos', carritoController.addNewProduct)
carritoRouter.delete('/api/carrito/:id/productos/:id_prod', carritoController.deleteProductById)