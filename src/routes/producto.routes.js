import express from 'express';
import * as productController from '../controllers/producto.controller'
import { validateAdmin } from '../middlewares/validateAdmin'

export const productRouter = express.Router()

productRouter.get('/api/productos', productController.getAllProducts)
productRouter.get('/api/productos/:id', productController.getProductById)
productRouter.post('/api/productos', validateAdmin, productController.addNewProduct)
productRouter.put('/api/productos/:id', validateAdmin, productController.updateProduct)
productRouter.delete('/api/productos/:id', validateAdmin, productController.deleteProduct)