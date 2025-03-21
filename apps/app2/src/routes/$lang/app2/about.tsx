import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/app2/about")({
	component: AboutComponent,
});

function AboutComponent() {
	return (
		<div className="p-2">
			<h3>INTERNAL ROUTE OF APP 2</h3>
		</div>
	);
}
