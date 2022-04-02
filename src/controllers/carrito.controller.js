import fs from 'fs'

const fileName = './src/data/carrito.txt'

export const createNewShopCart = async (req, res) => {
    const { nombre, descripcion, codigo, url, precio, stock } = req.body;
    let newShopCartId = 0;

    try {
        const listOfShopCart = await fs.promises.readFile(fileName, 'utf-8');
        const listParsed = listOfShopCart === '' ? [] : JSON.parse(listOfShopCart);

        if (listParsed.length === 0) {
            newShopCartId = 1;
        } else {
            let lastId = Math.max(...listParsed.map(shopcart => shopcart.id));
            newShopCartId = lastId += 1;
        }

        listParsed.push({
            id: newShopCartId,
            timestamp: Date.now(),
            productos: [
                {
                    id: 1,
                    timestamp: Date.now(),
                    nombre,
                    descripcion,
                    codigo,
                    url,
                    precio,
                    stock
                }
            ]
        });

        await fs.promises.writeFile(fileName, JSON.stringify(listParsed, null, 2));

        res.json({ id: newShopCartId });
    }
    catch (error) {
        console.error('Sucedio un error:', error)
        res.send('No se pudo crear el carrito')
    }
}

export const deleteShopCart = async (req, res) => {
    const { id } = req.params;
    try {
        const listOfShopCarts = JSON.parse(await fs.promises.readFile(fileName, 'utf-8'));
        const newList = listOfShopCarts.filter(shopcart => shopcart.id != parseInt(id));
        await fs.promises.writeFile(fileName, JSON.stringify(newList, null, 2));

        res.send('Carrito eliminado con éxito')
    }
    catch (error) {
        console.error('Sucedio un error:', error)
    }
}

export const getAllProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const listOfShopCart = JSON.parse(await fs.promises.readFile(fileName, 'utf-8'));
        const products = listOfShopCart.filter(shopcart => shopcart.id === parseInt(id))[0]?.productos;

        res.json({ 'productos': products })
    }
    catch (error) {
        console.error('Sucedio un error:', error)
        res.send('No se encontraron productos')
    }
}

export const addNewProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, codigo, url, precio, stock } = req.body;
    let newId = 0;

    try {
        const listOfShopCarts = JSON.parse(await fs.promises.readFile(fileName, 'utf-8'));
        const products = listOfShopCarts.filter(shopcart => shopcart.id === parseInt(id))[0]?.productos;

        let lastId = Math.max(...products.map(product => product.id));
        newId = lastId += 1;

        listOfShopCarts.filter(shopcart => shopcart.id === parseInt(id))[0]?.productos.push({
            id: newId,
            timestamp: Date.now(),
            nombre,
            descripcion,
            codigo,
            url,
            precio,
            stock
        });

        await fs.promises.writeFile(fileName, JSON.stringify(listOfShopCarts, null, 2));

        res.send('Producto agregado con éxito');
    }
    catch (error) {
        console.error('Sucedio un error:', error)
        res.send('Carrito no encontrado')
    }
}

export const deleteProductById = async (req, res) => {
    const { id, id_prod } = req.params;
    try {
        let listOfShopCarts = JSON.parse(await fs.promises.readFile(fileName, 'utf-8'));
        let products = listOfShopCarts.find(shopcart => shopcart.id === parseInt(id)).productos;        

        if (products.find(product => product.id === parseInt(id_prod)) === undefined) {
            return res.send('No se encontraron productos')
        }

        products = products.filter(product => product.id != parseInt(id_prod));
        listOfShopCarts.find(shopcart => shopcart.id === parseInt(id)).productos = products;

        await fs.promises.writeFile(fileName, JSON.stringify(listOfShopCarts, null, 2));
        res.send('Producto eliminado con éxito');
    }
    catch (error) {
        console.error('Sucedio un error:', error)        
    }
}
