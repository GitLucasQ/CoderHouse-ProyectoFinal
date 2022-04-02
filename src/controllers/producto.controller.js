import fs from 'fs'

const fileName = './src/data/productos.txt'

export const getAllProducts = async (req, res) => {
    try {
        const listOfProducts = await fs.promises.readFile(fileName, 'utf-8');
        res.json(listOfProducts === '' ? [] : JSON.parse(listOfProducts))
    }
    catch (error) {
        console.error('Sucedio un error:', error)
        res.send('No se encontraron productos')
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const listOfProducts = await fs.promises.readFile(fileName, 'utf-8');
        const foundedProduct = JSON.parse(listOfProducts).find(product => product.id === parseInt(id));
        res.json(foundedProduct)
    }
    catch (error) {
        console.error('Sucedio un error:', error)
        res.send('No se encontraron productos')
    }
}

export const addNewProduct = async (req, res) => {
    const { nombre, descripcion, codigo, url, precio, stock } = req.body;
    let newId = 0;

    try {
        const listOfProducts = await fs.promises.readFile(fileName, 'utf-8');
        const listParsed = listOfProducts === '' ? [] : JSON.parse(listOfProducts);

        if (listParsed.length === 0) {
            newId = 1;
        } else {
            let lastId = Math.max(...listParsed.map(product => product.id));
            newId = lastId += 1;
        }

        listParsed.push({
            id: newId,
            timestamp: Date.now(),
            nombre,
            descripcion,
            codigo,
            url,
            precio,
            stock
        });

        await fs.promises.writeFile(fileName, JSON.stringify(listParsed, null, 2));

        res.send('Producto agregado con éxito');
    }
    catch (error) {
        console.error('Sucedio un error:', error)
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, codigo, url, precio, stock } = req.body;
    try {
        const listOfProducts = JSON.parse(await fs.promises.readFile(fileName, 'utf-8'));
        const indexProduct = listOfProducts.findIndex(product => product.id === parseInt(id));
        if (indexProduct === -1) {
            return res.send('Producto no encontrado')
        }
        listOfProducts[indexProduct] = { id, timestamp: Date.now(), nombre, descripcion, codigo, url, precio, stock };
        await fs.promises.writeFile(fileName, JSON.stringify(listOfProducts, null, 2));

        res.send('Producto actualizado con éxito')
    }
    catch (error) {
        console.error('Sucedio un error:', error)
        res.send('No se encontraron productos')
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const listOfProducts = JSON.parse(await fs.promises.readFile(fileName, 'utf-8'));
        const newList = listOfProducts.filter(product => product.id != parseInt(id));
        await fs.promises.writeFile(fileName, JSON.stringify(newList, null, 2));

        res.send('Producto eliminado con éxito')
    }
    catch (error) {
        console.error('Sucedio un error:', error)
    }
}