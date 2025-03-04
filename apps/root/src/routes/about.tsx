import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: AboutComponent,
});

function AboutComponent() {
	return (
		<div className="p-2">
			<h3>INTERNAL ROUTE OF BASE APP</h3>
		</div>
	);
}
