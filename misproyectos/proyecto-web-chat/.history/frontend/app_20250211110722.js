const socket = io();

async function verifyIdentifier() {
    const username = prompt('Enter your username:');

    const res = await fetch('/verify-identifier', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    const result = await res.json();
    document.getElementById('username').value = result.username;
}

function sendMessage() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message-input').value;
    const recipient = document.getElementById('user-select').value;
    if (username && message) {
        socket.emit('chat message', { username: username, message: message, recipient: recipient });
        document.getElementById('message-input').value = '';
    }
}

// Cargar usuarios en línea
async function loadOnlineUsers() {
    const response = await fetch('/online-users');
    const users = await response.json();
    const userSelect = document.getElementById('user-select');
    userSelect.innerHTML = '<option value="">Select a user</option>';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.username;
        option.textContent = user.username;
        userSelect.appendChild(option);
    });
}

socket.on('chat message', (msg) => {
    const chatWindow = document.getElementById('chat-window');
    const newMessage = document.createElement('div');
    newMessage.textContent = `${msg.username}: ${msg.message}`;
    chatWindow.appendChild(newMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

// Verificar identificador y cargar usuarios en línea al iniciar
verifyIdentifier().then(() => {
    loadOnlineUsers();
});
