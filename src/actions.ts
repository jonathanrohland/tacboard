export type Action = {
    type: ActionType,
    payload?: any
}

export enum ActionType {
    FIELD_CLICKED = 'FIELD_CLICKED',
    HOUSE_CLICKED = 'HOUSE_CLICKED',
    UPDATE_FROM_SERVER = 'UPDATE_FROM_SERVER',
    SET_GAME_ID = 'SET_GAME_ID',
}