const socket = io();

function sendMessage() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message-input').value;
    if (username && message) {
        socket.emit('chat message', { username: username, message: message });
        document.getElementById('message-input').value = '';
    }
}

socket.on('chat message', (msg) => {
    const chatWindow = document.getElementById('chat-window');
    const newMessage = document.createElement('div');
    newMessage.textContent = `${msg.username}: ${msg.message}`;
    chatWindow.appendChild(newMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
