import {io} from 'socket.io-client'
import moment from 'moment'

const messageInput = document.getElementById('message-input')
const form = document.getElementById('form')



const socket = io('http://localhost:3000')

socket.on('receive-message', data => {
    displayMessage(data)
})

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = {
        email:document.getElementById('email').value,
        message: messageInput.value,
        time:moment().format('DD/MM/YYYY, h:mm:ss a')
    }
    if(data.message === "") return
    displayMessage(data)
    socket.emit('send-message' , data )
    messageInput.value = ''
})





function displayMessage(data){
    console.log(data);
    const div = document.createElement('div')
    div.innerHTML = `<span class="message-email">${data.email}</span> <span class="message-time">${data.time}</span><br>
                    <p class="message-message">${data.message}</p>
    `;
    document.getElementById('messages').append(div)
}


