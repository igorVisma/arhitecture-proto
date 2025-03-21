import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { config } from "dotenv";

config({ path: "../../.env" });

// https://vitejs.dev/config/
export default defineConfig({
	base: "/app1",
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
