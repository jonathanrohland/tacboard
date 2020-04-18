import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export function initI18n() {
    i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources: {
                de: {
                    translation: {
                        "game-id-prompt": "Bitte wählen Sie ein Spiel-Kennwort und schicken Sie es an ihre Mitspieler. Das Kennwort darf nur Buchstaben und Zahlen enthalten."
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