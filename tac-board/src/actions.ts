import { FieldIndex } from "./types";


export type Action = {
    type: ActionType,
    payload?: any
}

export enum ActionType {
    FIELD_CLICKED =  'FIELD_CLICKED',
    HOUSE_CLICKED =  'HOUSE_CLICKED',
}

export const fieldClicked = (index: FieldIndex) => (dispatch: any) => {
    dispatch({
        type: ActionType.FIELD_CLICKED,
        payload: {
            index
        }
    })
}