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
                        "landing-page__explanation": "Bitte wählen Sie ein Spiel-Kennwort und schicken Sie es an ihre Mitspieler. Das Kennwort darf nur Buchstaben und Zahlen enthalten.",
                        "landing-page__start-game": "Spiel Starten",
                        "landing-page__input-error": "Das Kennwort darf nur Buchstaben und Zahlen enthalten. Bitte wählen Sie ein anderes Passwort!",
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