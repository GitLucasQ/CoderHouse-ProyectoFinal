import express from 'express';
import { productRouter } from './routes/producto.routes'
import { carritoRouter } from './routes/carrito.routes'

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.use(productRouter)
app.use(carritoRouter)
app.use((req, res) => {
    res.status(404).json({
        'error': -2,
        'descripcion': 'Ruta no existente'
    })
})

app.listen(PORT, () => {
    console.log('Server online on port', PORT);
})