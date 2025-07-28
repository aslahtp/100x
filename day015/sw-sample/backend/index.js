const express = require('express');
const { WebSocketServer } = require('ws');

const app = express();

const server = app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    ws.on('message', (message) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message,{binary: false});
            }
        });
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

