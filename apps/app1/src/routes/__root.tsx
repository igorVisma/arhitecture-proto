import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<div className="p-2 flex gap-3 text-lg">
				<Link
					to="/"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}>
					APP 1 Home
				</Link>{" "}
				<Link
					to="/about"
					activeProps={{
						className: "font-bold",
					}}>
					INTERNAL ROUTE
				</Link>
				<a className="text-lg" href={`${window.location.origin}/app2`}>
					To App 2
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
