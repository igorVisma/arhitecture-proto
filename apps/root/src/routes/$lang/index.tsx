import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SharedComponent } from "@repo/ui/shared-component";

export const Route = createFileRoute("/$lang/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<SharedComponent />
		</div>
	);
}
