import { Color, State } from "./types";

export function getNumberOfMarblesOnboard(state: State, color: Color): number {
    return Object.values(state.marblePositions!).reduce((count: number, marbleColor) => marbleColor === color ? count + 1 : count, 0);
}