export class Products {
    constructor() {
        this.products = []
    }

    getAllProducts(){
       if(this.products.length!== 0){
           return this.products
       }
       return -1
    }
    
    getProductById(id) {
            const product = this.products.find(product => product.id == id)
            if (product) {
                return product
            }
            return -1
    }

    addProduct(name, price, thumbnail,stock,description) {
        console.log(this.products)
        this.products.push({
            name: name,
            price: price,
            description: description,
            stock: stock,
            thumbnail: thumbnail,
            id: this.products.length + 1,
            timestamp : Date.now(),
            code : '#'+ Math.floor(Math.random() * 100000) + 1
        })
    }
    
    deleteProduct(id) {
        const product = this.products.find(product => product.id == id)
        if (product) {
            var i = this.products.indexOf( product )
            this.products.splice(i, 1)
        }
    }
}