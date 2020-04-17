import { Action, ActionType } from "./actions";
import { State, FieldIndex, Color } from "./types";
import { getWebsocket, initialiseConnection } from './Websocket';
import { getNumberOfMarblesOnboard } from "./selectors";


const webSocket = getWebsocket();

function sendMarblePositionsToServer(state: State) {
    if (!state.gameId) {
        throw new Error('Cannot send state to server without gameId');
    }

    const dataToSend = {
        gameId: state.gameId,
        marblePositions: state.marblePositions,
    }
    console.log("Sending marble positions to server:", dataToSend);

    webSocket.send(JSON.stringify({
        'message': 'sendGameState',
        'data': dataToSend,
    }))
}

function isMarblePickedUp(state: State) {
    return state.pickedUpMarble !== undefined;
}

function isFieldEmpty(state: State, index: FieldIndex) {
    return state.marblePositions![index] === undefined;
}

function setMarbleToField(state: State, index: FieldIndex) {
    console.log(`Setting  marble to field  ${index}`, state);

    if (state.pickedUpMarble === undefined) {
        throw new Error(`Invalid state, no marble selected to set, state is: ${state.toString()}`);
    }

    const nextMarblePostitions: typeof state.marblePositions = {
        ...state.marblePositions,
        [index]: state.pickedUpMarble.color
    }

    if (state.pickedUpMarble.field !== null && state.pickedUpMarble.field !== index) {
        nextMarblePostitions[state.pickedUpMarble.field] = undefined;
    }

    const nextState = {
        ...state,
        marblePositions: nextMarblePostitions,
        pickedUpMarble: undefined
    }

    sendMarblePositionsToServer(nextState);

    return nextState;
}

function pickUpMarbleFromField(state: State, index: FieldIndex) {
    console.log(`Picking  up  marble from field  ${index}`, state);

    if (state.pickedUpMarble !== undefined) {
        throw new Error(`Invalid state, there is already a marble picked up, state is: ${state.toString()}`);
    }

    if (!state.marblePositions![index]) {
        throw new Error(`Invalid state, no marble to pick up at index ${index}, state is: ${state.toString()}`);
    }

    return {
        ...state,
        pickedUpMarble: {
            color: state.marblePositions![index]!,
            field: index
        }
    }
}

function dropMarbleToHouse(state: State) {
    const nextMarblePostitions = state.marblePositions;

    if (state.pickedUpMarble?.field !== null) {
        nextMarblePostitions![state.pickedUpMarble!.field] = undefined;
    }

    const nextState = {
        ...state,
        pickedUpMarble: undefined,
    }

    sendMarblePositionsToServer(nextState);

    return nextState;
}

function pickUpMarbleFromHouse(state: State, color: Color) {
    return {
        ...state,
        pickedUpMarble: {
            color,
            field: null
        }
    }
}

export function rootReducer(state: State | undefined, action?: Action): State {
    if (typeof state === 'undefined') {
        return {
            marblePositions: {}
        };
    }

    if (action?.type === ActionType.SET_GAME_ID) {
        initialiseConnection(webSocket, action.payload!.gameId);
        return {
            ...state,
            gameId: action.payload!.gameId
        }
    }

    if (action?.type === ActionType.FIELD_CLICKED) {
        if (isMarblePickedUp(state)) {
            return setMarbleToField(state, action.payload!.index);
        } else if (!isFieldEmpty(state, action.payload!.index)) {
            return pickUpMarbleFromField(state, action.payload!.index);
        }
    }

    if (action?.type === ActionType.HOUSE_CLICKED) {
        if (state.pickedUpMarble?.color === action.payload!.color) {
            return dropMarbleToHouse(state);
        }

        if (getNumberOfMarblesOnboard(state, action.payload!.color) < 4) {
            return pickUpMarbleFromHouse(state, action.payload!.color);
        }

        return state;
    }

    if (action?.type === ActionType.UPDATE_FROM_SERVER) {
        console.log('Updating marble positions from server:', action.payload.marblePositions)

        return {
            ...state,
            marblePositions: action.payload.marblePositions
        }
    }

    return state;
}

export default rootReducer;