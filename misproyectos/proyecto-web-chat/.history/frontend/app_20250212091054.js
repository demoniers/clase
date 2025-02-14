const socket = io();

function verifyIdentifier() {
  const username = prompt("Enter your username:");
  socket.emit("verify-identifier", { username });

  socket.on("verified-identifier", (data) => {
    document.getElementById("username").value = data.username;
    loadOnlineUsers();
    loadMessageHistory(); // Cargar el historial de mensajes después de verificar el usuario
  });

  socket.on("error", (msg) => {
    alert(msg);
  });
}
// ENVIAR MENSAJES
function sendMessage() {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message-input").value;
  const recipient = document.getElementById("user-select").value;
  if (username && message) {
    socket.emit("chat message", {
      username: username,
      message: message,
      recipient: recipient,
    });
    document.getElementById("message-input").value = "";
  }
}

// Cargar usuarios en línea
async function loadOnlineUsers() {
  const response = await fetch("/online-users");
  const users = await response.json();
  const userSelect = document.getElementById("user-select");
  userSelect.innerHTML = '<option value="">Select a user</option>';
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.username;
    option.textContent = user.username;
    userSelect.appendChild(option);
  });
}
// HISTORIAL DE MENSAJES
async function loadMessageHistory() {
  const response = await fetch('/message-history');
  const messages = await response.json();
  const chatWindow = document.getElementById('chat-window');
  chatWindow.innerHTML = ''; // Limpiar el historial actual
  messages.forEach(msg => {
      const newMessage = document.createElement('div');
      const messageContent = msg.recipient ? `privado: ${msg.message}` : msg.message;
      newMessage.textContent = `${msg.username}: ${messageContent}`;
      chatWindow.appendChild(newMessage);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/*
socket.on("chat message", (msg) => {
  const chatWindow = document.getElementById("chat-window");
  const newMessage = document.createElement("div");
  newMessage.textContent = `${msg.username}: ${msg.message}`;
  chatWindow.appendChild(newMessage);
  chatWindow.scrollTop = chatWindow.scrollHeight;
});*/
socket.on("chat message", (msg) => {
  if (msg.cecipient) {
    const chatWindow = document.getElementById("chat-window");
    const messageContent = msg.message;
    const newMessage = document.createElement("div");
    newMessage.textContent = `${msg.username}: ${messageContent}`;
    chatWindow.appendChild(newMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } else {
    const chatWindowPrive = document.getElementById("chat-private");
    const messageContent = `(privado) ${msg.message}`;
    const newMessage = document.createElement("div");
    newMessage.textContent = `${msg.username}: ${messageContent}`;
    chatWindowPrive.appendChild(newMessage);
    chatWindowPrive.scrollTop = chatWindow.scrollHeight;
  }
});

// Verificar identificador y cargar usuarios en línea al iniciar
verifyIdentifier();
