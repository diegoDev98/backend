export class Carrito{
    constructor() {
        this.cart = []
    }
    getAllCartItems(){
        if(this.cart.length!== 0){
            return this.cart
        }
        return -1
     }

    getCartItem(id) {
        const product = this.cart.find(product => product.id == id)
        if (product) {
            return product
        }
        return -1
}

    addCartItem(product) {
        this.cart.push(product)
    }
    
    deleteCartItem(id) {
        const product = this.cart.find(product => product.id == id)
        if (product) {
            var i = this.cart.indexOf( product )
            this.cart.splice(i, 1)
        }
    }
}