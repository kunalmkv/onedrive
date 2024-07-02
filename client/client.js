const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
    console.log(`Received message: ${event.data}`);
};

socket.onopen = () => {
    console.log('Connected to server');

    // List files
    socket.send('listFiles');

    // Download file
    socket.send('downloadFile:YOUR_FILE_ID_HERE');

    // List users with access to a file
    socket.send('listUsersWithAccess:YOUR_FILE_ID_HERE');
};

socket.onerror = (error) => {
    console.log('WebSocket error:', error);
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};
