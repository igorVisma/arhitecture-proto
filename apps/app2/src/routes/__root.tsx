import * as React from "react";
import { Link, Outlet, createRootRoute, useParams } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
});

export function RootComponent() {
	const { lang = "en" } = useParams({ strict: false });

	return (
		<>
			<div className="p-2 flex gap-2 text-lg">
				<Link
					to="/$lang/app2"
					activeProps={{
						className: "font-bold",
					}}
					params={{ lang }}
					activeOptions={{ exact: true }}>
					App 2 Home
				</Link>{" "}
				<Link
					to="/$lang/app2/about"
					params={{ lang }}
					activeProps={{
						className: "font-bold",
					}}>
					INTERNAL ROUTE OF APP 2
				</Link>
				<a className="text-lg" href={`${window.location.origin}/${lang}/app1`}>
					To App 1
				</a>
				<a className="text-lg m-auto self-end" href={`${window.location.origin}/${lang}`}>
					To ROOT
				</a>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
