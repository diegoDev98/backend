import {io} from 'socket.io-client'
import moment from 'moment'

const tableBody = document.getElementById('tableBody')
const form = document.getElementById('form')
const name = document.getElementById('name')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')


let products = []


const socket = io('http://localhost:3000')

socket.on('receive-product', data => {
    products=data;
    displayTable(data)
})

form.addEventListener('submit', e => {
    e.preventDefault()
    const product = {
        name:name.value,
        price:price.value,
        thumbnail:thumbnail.value
    }
    products.push(product)
    if(product.name === "" || product.price === "" || product.thumbnail === "") return
    displayTable(products)
    socket.emit('send-product', products)
})





function displayTable(data){
    console.log(data);
    document.getElementById('tableBody').innerHTML='';
    data.forEach(element => {
        const row = document.createElement('tr')
        row.innerHTML = `<td>${element.name}</td> <td>${element.price}</td>
                         <td><img src='${element.thumbnail}' width='80' height='80'</td>
                        `;
    document.getElementById('tableBody').append(row)
    });
    
}


