import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// console.log("APP1_BASE_PATH", import.meta.env.APP_1_BASE_PATH);

// Set up a Router instance
const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	// basepath: import.meta.env.APP_1_BASE_PATH,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<RouterProvider router={router} />);
}
