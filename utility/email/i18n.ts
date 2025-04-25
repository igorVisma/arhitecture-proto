import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./locales/en/translations.json";
import finnish from "./locales/fi/translations.json";

// Define the language type
export type Language = "en" | "fi";

// Define the resources structure type
type Resources = {
	[key in Language]: {
		translation: typeof english;
	};
};

// Create properly typed resources object
const resources: Resources = {
	en: { translation: english },
	fi: { translation: finnish },
};

export async function initializeI18nForParse(language: Language) {
	const i18nInstance = i18n.createInstance();
	await i18nInstance.init({
		resources,
		lng: language,
		fallbackLng: "en",
		interpolation: {
			escapeValue: true,
		},
	});
	return i18nInstance;
}

export const initializeI18n = (language: Language) => {
	return i18n
		.use(initReactI18next) // passes i18n down to react-i18next
		.init({
			resources,
			lng: language, // The language to use initially
			fallbackLng: "en", // Use 'en' if language or key is missing
			interpolation: {
				escapeValue: false, // React already safes from xss
			},
		});
};

// Explicitly type the supported languages array
export const supportedLngs: Language[] = Object.keys(resources) as Language[];

export default i18n;
