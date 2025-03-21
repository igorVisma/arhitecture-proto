import { defineConfig, ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { config } from "dotenv";

config({ path: "../../.env" });

const processEnvValues = {
	"import.meta.env.APP_1_BASE_PATH": JSON.stringify(process.env.APP_1_BASE_PATH),
};

// // Custom plugin to rewrite asset paths
// const rewriteAssetPathsPlugin = () => ({
// 	name: "rewrite-asset-paths",
// 	configureServer(server: ViteDevServer) {
// 		server.middlewares.use((req, res, next) => {
// 			next();
// 		});
// 	},
// });

// https://vitejs.dev/config/
export default defineConfig({
	define: processEnvValues,
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
