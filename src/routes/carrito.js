import express from "express"
import { Carrito } from "../Carrito"
import { administrador } from "../index"
import { products } from "./productos"

const router = express.Router()

const cart = new Carrito()


router.get('/listar', (req, res) => {

    const response = cart.getAllCartItems()
    if (response === -1) {
        return res.status(400).json({
            error: 'No hay productos en su carrito'
        })
    }
    res.json(response)
});

router.get('/listar/:id', (req, res) => {
    const { id } = req.params

    const response = cart.getCartItem(id);
    if (response === -1) {
        return res.status(400).json({
            error: 'Ese producto no esta en su carrito '
        })
    }
    res.json(response)
});


router.post('/agregar/:id_producto', (req, res) => {
    const { id_producto } = req.params
    
    const product = products.getProductById(id_producto)

        if (product === -1) {
            return res.status(400).json({
                error: 'Producto no existe'
            })
        }
        cart.addCartItem(product)
        res.redirect('/')
   
    
});




router.delete("/borrar/:id", (req, res) => {
        const { id } = req.params
        const response = cart.getCartItem(id)
        if (response=== -1) {
            return res.status(400).json({
                error: 'Ese producto no esta en su carrito '
            })
        }
        cart.deleteCartItem(id)
        res.json(response)
   
})



export default router