const express = require('express');
const WebSocket = require('ws');
const { authenticate, listFiles, downloadFile, listUsersWithAccess } = require('./onedrive');

const app = express();
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
        console.log(`Received message: ${message}`);
        const [command, param] = message.toString().split(':');

        const token = await authenticate();
        switch (command) {
            case 'listFiles':
                await listFiles(token, ws);
                break;
            case 'downloadFile':
                await downloadFile(token, param, ws);
                break;
            case 'listUsersWithAccess':
                await listUsersWithAccess(token, param, ws);
                break;
            default:
                ws.send('Unknown command');
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
