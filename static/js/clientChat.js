const socket = io(`http://localhost:4000`);
const messageBox = document.querySelector(`#message-box`);
const messageForm = document.querySelector(`#send-container`);
const messageInput = document.querySelector(`#message-input`);

let username = document.querySelector('#user').innerHTML
let roomUser = document.querySelector('#room').innerHTML

console.log(username, roomUser)

socket.emit('joinRoom', { username, roomUser });

socket.on('message', (message) => {
  console.log(message)
  createMessage(message)
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let msg = e.target.elements.msg.value;
  console.log(msg)

  socket.emit('chatMessage', msg)

  e.target.elements.msg.value = '';
})

function createMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message') // deze class kan je stylen Sarah :)
  const p = document.createElement('p')
  p.innerText = message.username
  div.appendChild(p)
  const messageBox = document.createElement('p')
  messageBox.innerText = message.text
  div.appendChild(messageBox)
  document.querySelector('#message-box').appendChild(div)
}

// appendMessage(`Je bent gejoined`);
// socket.emit(`new-user`, name);

// socket.on('connect', function() {
//   // Connected, let's sign-up for to receive messages for this room
//   socket.emit('room', room);
// });

// socket.on(`user-connected`, (name) => {
//   appendMessage(`${name} connected`);
// });

// socket.on(`chat-message`, (data) => {
//   appendMessage(`${data.name}: ${data.message}`);
// });

// socket.on(`user-disconnected`, (name) => {
//   appendMessage(`${name} disconnected`);
// });

// messageForm.addEventListener(`submit`, (e) => {
//   e.preventDefault();
//   const message = messageInput.value;
//   appendMessage(`You: ${message}`);
//   socket.emit(`send-chat-message`, message);
//   messageInput.value = ``;
// });

function appendMessage(message) {
  const messageElement = document.createElement(`div`);
  messageElement.innerText = message;
  messageBox.append(messageElement);
}
