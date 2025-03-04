import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { config } from "dotenv";

config({ path: "../../.env" });

const processEnvValues = {
	"import.meta.env.APP_2_BASE_PATH": JSON.stringify(process.env.APP_2_BASE_PATH),
};

// https://vitejs.dev/config/
export default defineConfig({
	define: processEnvValues,
	plugins: [
		TanStackRouterVite({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
	],
});
