/**
 * Default configurations for common environments
 * Separated for better tree-shaking - only imported when needed
 */
export const defaultConfigs = {
	development: {
		vismaSignApi: { baseURL: "http://localhost:3001" },
		shareLinkApi: { baseURL: "http://localhost:3002" },
		userService: { baseURL: "http://localhost:3003" },
	},
	staging: {
		vismaSignApi: { baseURL: "https://visma-sign-api-staging.example.com" },
		shareLinkApi: { baseURL: "https://share-link-api-staging.example.com" },
		userService: { baseURL: "https://user-service-staging.example.com" },
	},
	production: {
		vismaSignApi: { baseURL: "https://visma-sign-api.example.com" },
		shareLinkApi: { baseURL: "https://share-link-api.example.com" },
		userService: { baseURL: "https://user-service.example.com" },
	},
} as const;

/**
 * Type for environment names
 */
export type Environment = keyof typeof defaultConfigs;

/**
 * Type for service configurations
 */
export type ServiceConfigs = (typeof defaultConfigs)[Environment];
