const socket = io('http://localhost:8000');

const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('iphone_text_message.mp3')

const append = (message, position)=>{
const messageElement = document.createElement('div');
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position == 'left'){

    audio.play();

}
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message)
    messageInput.value = ''

})

const namee = prompt("Enter your name to join");


socket.emit('new-user-joined', namee)

socket.on('user-joined', namee=>{
append(`${namee} joined the chat `, 'right' )
})  

socket.on('receive', data=>{
    append(`${data.name}: ${data.message }`, 'left' )
    })  

socket.on('left', data=>{
        append(`${data.name} left the chat`, 'left' )
     })  