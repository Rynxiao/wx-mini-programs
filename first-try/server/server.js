const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 12112 });

wss.on('connection', ws => {
  console.log('connection established');
  ws.on('message', message => {
    console.log("on message coming");
    ws.send(message);
  });
});