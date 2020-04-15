let webSocket: WebSocket;

const WEBSOCKET_URL = "wss://sd8oo3pxl1.execute-api.eu-central-1.amazonaws.com/Prod";

function initialiseConnection(socket: WebSocket, gameId: string) {
    socket.send(JSON.stringify({
        'message': 'initSession',
        'data': {
            gameId
        }
    }))
}


function openWebsocket() {
    webSocket = new WebSocket(WEBSOCKET_URL);

    webSocket.onopen = () => {
        console.log('Opened Websocket connection.');
        initialiseConnection(webSocket, 'default');
    }

    return webSocket;
}

export function getWebsocket() {
    if (!webSocket) {
        return openWebsocket();
    }

    return webSocket;
}