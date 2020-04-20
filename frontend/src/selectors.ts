import { Color, State } from "./types";

export function getNumberOfMarblesOnboard(state: State, color: Color): number {
    const numMarbles = Object.values(state.marblePositions!).reduce((count: number, marbleColor) => marbleColor === color ? count + 1 : count, 0);

    if (numMarbles < 0 || numMarbles > 4) {
        console.log(`Calculated invalid number of marbles on field for color ${color}. State:`, state);
    }

    return numMarbles;
}