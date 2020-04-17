import { GameId } from "./types";
import { WEBSOCKET_URL } from "./config";

let webSocket: WebSocket;

export function initialiseConnection(socket: WebSocket, gameId: GameId) {
    if (webSocket.readyState === WebSocket.CONNECTING) {
        const previousOnopen = webSocket.onopen;

        webSocket.onopen = (event) => {
            if (typeof previousOnopen === 'function') {
                previousOnopen.call(webSocket, event);
            }

            socket.send(JSON.stringify({
                'message': 'initSession',
                'data': {
                    gameId
                }
            }))
        }
    } else {
        webSocket.send(JSON.stringify({
            'message': 'initSession',
            'data': {
                gameId
            }
        }))
    }
}

function openWebsocket() {
    webSocket = new WebSocket(WEBSOCKET_URL);

    webSocket.onopen = () => {
        console.log('Opened Websocket connection.');
    }

    return webSocket;
}

export function getWebsocket() {
    if (!webSocket) {
        return openWebsocket();
    }

    return webSocket;
}