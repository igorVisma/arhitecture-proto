/**
 * @package api-clients
 *
 * A collection of API clients for different services with TypeScript support
 */

// Export base classes and types
export { BaseApiClient } from "./base-client";
export type { BaseClientConfig, ApiError, ApiResult, RequestConfig } from "./types";
export { createSuccessResult, createErrorResult } from "./types";

// Export Visma Sign API client
export { VismaSignApiClient } from "./visma-sign-api/client";
export type * from "./visma-sign-api/types";

// Export Share Link API client
export { ShareLinkApiClient } from "./share-link-api/client";
export type * from "./share-link-api/types";

/**
 * Default configurations for common environments
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
};
