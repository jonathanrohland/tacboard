import { GAME_ID_REGEX } from "./config";
import { GameId } from "./types";

export function getLocationHash() {
    const hash = window.location.hash;
    if (hash[0] === '#') {
        return hash.substring(1);
    }
    return hash;
}

export function isValidGameId(string: string): string is GameId {
    const match = GAME_ID_REGEX.exec(string);
    return !!match
}

export function updateHashWithGameId(gameId: GameId) {
    window.history.pushState({}, '', `#${gameId}`);
}

export function clearHash() {
    window.history.pushState({}, '', '');
}