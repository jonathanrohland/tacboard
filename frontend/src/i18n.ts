import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export function initI18n() {
    i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources: {
                de: {
                    translation: {
                        "landing-page__header": "Willkommen beim Tac-Brett",
                        "landing-page__explanation": "Bitte wähle ein Spiel-Kennwort und schicke es an deine Mitspieler. Das Kennwort darf nur Buchstaben und Zahlen enthalten.",
                        "landing-page__start-game": "Spiel Starten",
                        "landing-page__input-error": "Das Kennwort darf nur Buchstaben und Zahlen enthalten. Bitte wähle ein anderes Kennwort!",
                        "landing-page__expiration-warning": "Spielstände werden nach einer Woche gelöscht.",
                        "footer__github-icon": "GitHub Logo",
                        "board__game-link-prefix": "Schicke deinen Mitspielern diesen Link",
                        "footer__buy-me-a-beer-link": "Gib uns ein Bier aus!",
                        "footer__privacy-link": "Datenschutz",
                        "footer__about-link": "Über tac-brett.de",
                    }
                }
            },
            lng: "de",
            fallbackLng: "de",

            interpolation: {
                escapeValue: false
            }
        });
}