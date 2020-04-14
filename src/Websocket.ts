let webSocket: WebSocket;

function initialiseConnection(socket: WebSocket) {
    socket.send(JSON.stringify({
        'message': 'initSession',
    }))
}


function openWebsocket() {
    webSocket = new WebSocket("wss://qdgv7zrkrl.execute-api.eu-central-1.amazonaws.com/Prod");

    webSocket.onopen = () => {
        console.log('Opened Websocket connection.');
        initialiseConnection(webSocket);
    }

    return webSocket;
}

export function getWebsocket() {
    if (!webSocket) {
        return openWebsocket();
    }

    return webSocket;
}