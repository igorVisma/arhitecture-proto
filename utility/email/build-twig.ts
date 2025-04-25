import fs from "fs/promises";
import path from "path";
import React, { FunctionComponent } from "react";
import { render } from "@react-email/render";
import { I18nextProvider } from "react-i18next";

import { initializeI18nForParse, supportedLngs } from "./i18n";
import { MyEmail } from "./emails/newEmail";

type TemplateEntry<P extends {}> = {
	name: string;
	component: FunctionComponent<P>;
	props: P;
};

// --- Configuration ---
const baseOutputDir = path.resolve("../symfony-ready");
const templatesToBuild: TemplateEntry[] = [{ name: "welcome", component: MyEmail }];
// --- End Configuration ---

async function buildEmails() {
	try {
		console.log(`Supported languages: ${supportedLngs.join(", ")}`);

		for (const lng of supportedLngs) {
			console.log(`\nBuilding templates for language: ${lng}`);

			// Initialize i18next for the current language *for this render pass*
			const i18nInstance = await initializeI18nForParse(lng);

			await fs.mkdir(baseOutputDir, { recursive: true }); // Ensure language directory exists

			for (const template of templatesToBuild) {
				console.log(`  Building ${template.name}...`);

				const ComponentToRender = template.component;

				const element = React.createElement(
					I18nextProvider,
					{ i18n: i18nInstance },
					React.createElement(ComponentToRender),
				);

				// Render HTML
				const html = await render(element);
				const htmlPath = path.join(baseOutputDir, `${template.name}.${lng}.html.twig`); // Or .html
				await fs.writeFile(htmlPath, html);
				console.log(`    -> Saved HTML to ${htmlPath}`);

				// Render Plain Text (Optional)
				const text = await render(element, { plainText: true });
				const textPath = path.join(baseOutputDir, `${template.name}.${lng}.txt.twig`); // Or .txt
				await fs.writeFile(textPath, text);
				console.log(`    -> Saved Text to ${textPath}`);
			}
		}

		console.log("\nEmail templates built successfully for all languages!");
	} catch (error) {
		console.error("Error building email templates:", error);
		process.exit(1);
	}
}

buildEmails();
