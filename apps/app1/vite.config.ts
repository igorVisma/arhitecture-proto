import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { config } from "dotenv";

config({ path: "../../.env" });

const processEnvValues = {
	"import.meta.env.APP_1_BASE_PATH": JSON.stringify(process.env.APP_1_BASE_PATH),
};

// https://vitejs.dev/config/
export default defineConfig({
	define: processEnvValues,
	base: process.env.APP_1_BASE_PATH,
	plugins: [
		TanStackRouterVite({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
	],
	server: {
		allowedHosts: true,
	},
});
