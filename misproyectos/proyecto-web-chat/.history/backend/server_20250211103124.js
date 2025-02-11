<!DOCTYPE html>
<html>
<head>
    <title>Chat App</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <div id="chat-window"></div>
    <input type="text" id="username" placeholder="Username" />
    <input type="text" id="message-input" placeholder="Type a message" />
    <select id="user-select">
        <option value="">Select a user</option>
    </select>
    <button onclick="sendMessage()">Send</button>

    <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
