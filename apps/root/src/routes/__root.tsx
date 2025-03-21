import * as React from "react";
import { Link, Navigate, Outlet, createRootRoute, useParams } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const { lang } = useParams({ strict: false });

	if (!lang) {
		return <Navigate to="/$lang" params={{ lang: "en" }} />;
	}

	return (
		<>
			<div className="p-2 flex gap-2 text-lg">
				<Link
					to="/$lang"
					activeProps={{
						className: "font-bold",
					}}
					params={{ lang }}
					activeOptions={{ exact: true }}>
					Home
				</Link>{" "}
				<Link
					to="/$lang/about"
					params={{ lang }}
					activeProps={{
						className: "font-bold",
					}}>
					TO INTERNAL ROUTER OF THIS APP
				</Link>
				<a className="text-lg" href={`${window.location.origin}/${lang}/app1`}>
					To App 1
				</a>
				<a className="text-lg" href={`${window.location.origin}/${lang}/app1`}>
					To App 2
				</a>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
