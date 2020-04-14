let webSocket: WebSocket;

function initialiseConnection(socket: WebSocket, gameId: string) {
    // socket.send(JSON.stringify({
    //     'message': 'initSession',
    //     gameId
    // }))
}


function openWebsocket() {
    webSocket = new WebSocket("wss://rjpbuvbbpc.execute-api.eu-central-1.amazonaws.com/Prod");

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