import { FieldIndex } from "./types";


export type Action = {
    type: ActionType,
    payload?: any
}

export enum ActionType {
    FIELD_CLICKED = 'FIELD_CLICKED',
    HOUSE_CLICKED = 'HOUSE_CLICKED',
    UPDATE_FROM_SERVER = 'UPDATE_FROM_SERVER',
}

export const fieldClicked = (index: FieldIndex) => (dispatch: any) => {
    dispatch({
        type: ActionType.FIELD_CLICKED,
        payload: {
            index
        }
    })
}