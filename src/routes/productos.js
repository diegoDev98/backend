import express from "express"
import { Products } from "../Products"
import { administrador } from "../index"

const router = express.Router()

export const products = new Products()

router.get('/listar/:id', (req, res) => {
    const { id } = req.params

    const response = products.getProductById(id);
    if (response === -1) {
        return res.status(400).json({
            error: 'no existe el id '
        })
    }
    res.json(response)
});

router.get('/listar', (req, res) => {

    const response = products.getAllProducts()
    if (response === -1) {
        return res.status(400).json({
            error: 'No hay productos cargados'
        })
    }
    res.json(response)
});


router.post('/agregar', (req, res) => {
    if(administrador=== true){
        const { name, price, thumbnail,stock,description } = req.body;
        const body = req.body
        const numeroConvertido = Number(body.price)

        if (!name || !price || !thumbnail || !stock || !description || !numeroConvertido) {
            return res.status(400).json({
                error: 'Deben ingresar name: string ,price: number , thumbnail: string , stock:number, description: string'
            })
        }
        products.addProduct(name, price, thumbnail,stock,description)
        res.redirect('/')
    }
    else {
        return res.status(400).json({
            error: 'No es administrador'
        })
    }
});



router.put("/actualizar/:id", (req, res) => {
    if(administrador===true){
        const { id } = req.params
        const body = req.body
        const response = products.getProductById(id)
        if (response === -1) {
            return res.status(400).json({
                error: 'no existe el id ' + id
            })
        }
        const numeroConvertido = Number(body.price) 
        if (
            !numeroConvertido||
            !body.name || 
            !body.price ||
            !body.thumbnail ||
            !body.stock ||
            !body.description ||
            typeof body.name != "string" ||
            typeof body.thumbnail != "string" ||
            typeof body.price != "number" ||
            typeof body.stock != "number" ||
            typeof body.description != "string" 
            
        ) {
            res.status = 400
            return res.json({
                msg: "necesito el name: string, price: number y thumbnail: string"

            })
        }
        response.name = body.name
        response.price = body.price
        response.thumbnail = body.thumbnail
        response.stock = body.stock
        response.description = body.description
        res.json(response)
    }
    else {
        return res.status(400).json({
            error: 'No es administrador'
        })
    }
})

router.delete("/borrar/:id", (req, res) => {
    if(administrador === true){
        const { id } = req.params
        const response = products.getProductById(id)
        if (!response) {
            return res.status(400).json({
                error: 'no existe el id ' + id
            })
        }
        products.deleteProduct(id)
        res.json(response)
    }
    else {
        return res.status(400).json({
            error: 'No es administrador'
        })
    }
})



export default router