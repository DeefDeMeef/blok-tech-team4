const socket = io(`http://localhost:4000`);
const messageBox = document.querySelector(`#message-box`);
const messageForm = document.querySelector(`#send-container`);
const messageInput = document.querySelector(`#message-input`);

const mail = document.querySelector(`p`);
const content = mail.textContent;

const name = content;

appendMessage(`Je bent gejoined`);
socket.emit(`new-user`, name);

socket.on(`user-connected`, (name) => {
  appendMessage(`${name} connected`);
});

socket.on(`chat-message`, (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on(`user-disconnected`, (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit(`send-chat-message`, message);
  messageInput.value = ``;
});

function appendMessage(message) {
  // messageElement.classList.add('chat-message');
  const messageElement = document.createElement(`div`);
  messageElement.innerText = message;
  messageBox.append(messageElement);
}
