import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<div className="p-2 flex gap-2 text-lg">
				<Link
					to="/"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}>
					App 2 Home
				</Link>{" "}
				<Link
					to="/about"
					activeProps={{
						className: "font-bold",
					}}>
					INTERNAL ROUTE OF APP 2
				</Link>
				<a className="text-lg" href={`${window.location.origin}/app1`}>
					To App 1
				</a>
				<a className="text-lg m-auto self-end" href={`${window.location.origin}/`}>
					To ROOT
				</a>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
