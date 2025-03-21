import { Link, Outlet, createRootRoute, useParams } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => <div>12312312 Not Found</div>,
});

function RootComponent() {
	const { lang = "en" } = useParams({ strict: false });

	console.log(lang);

	// current route
	console.log("current route", window.location.pathname);

	// node env
	console.info("node env", process.env.NODE_ENV);

	return (
		<>
			<div className="p-2 flex gap-3 text-lg">
				<Link
					to="/$lang/app1"
					params={{ lang: "en" }}
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}>
					APP 1 Home s
				</Link>{" "}
				<Link
					to="/$lang/app1/about"
					params={{ lang: "en" }}
					activeProps={{
						className: "font-bold",
					}}>
					INTERNAL ROUTE
				</Link>
				<a className="text-lg" href={`${window.location.origin}/${lang}/app2`}>
					To App 2
				</a>
				<a className="text-lg m-auto self-end" href={`${window.location.origin}/${lang}/`}>
					To ROOT
				</a>
			</div>
			<hr />
			<Outlet />
			{/* <TanStackRouterDevtools position="bottom-right" /> */}
		</>
	);
}
