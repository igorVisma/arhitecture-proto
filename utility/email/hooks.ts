export const useTwigVariables = <T extends Record<string, unknown>>(props: T) => {
	// check that all props are strings
	const allPropsAreStrings = Object.values(props).every((value) => typeof value === "string");

	if (!allPropsAreStrings) {
		throw new Error("All props must be strings");
	}

	// During development/preview, use default values
	// During build, this will be replaced with Twig syntax: {{ name }}
	const twigVar = (name: string) => {
		if (process.env.NODE_ENV === "production") {
			return `{{ ${name} }}`;
		}
		throw new Error(`Twig variable ${name} is not defined`);
	};

	const newProps = Object.entries(props).reduce((acc, [key, value]) => {
		if (value === undefined) {
			return acc;
		}
		if (typeof value === "string") {
			acc[key] = twigVar(key) || value;
		} else {
			acc[key] = value;
		}
		return acc;
	}, {});
	return { ...newProps };
};
