const socket = io();
const app = feathers();

app.configure(feathers.socketio(socket));

async function sendMessage() {
  const messageInput = document.getElementById('message-text');
  await app.service('messages').create({
    text: messageInput.value
  });
  messageInput.value = '';
}

function addMessage(message){
  const messageElement = document.createElement('p');
  messageElement.textContent = message.text;
  document.getElementById('main').appendChild(messageElement);
}

const main = async () => {
  const messages = await app.service('messages').find();
  messages.forEach(addMessage);

  app.service('messages').on('created', addMessage);
}

main();
