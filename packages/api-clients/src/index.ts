/**
 * @package api-clients
 *
 * A collection of API clients for different services with TypeScript support
 */

// Export base classes and types
export { BaseApiClient } from "./base-client";
export type { BaseClientConfig, ApiError, ApiResult, RequestConfig } from "./types";
export { createSuccessResult, createErrorResult } from "./types";

// Export API-1 client
export { Api1Client } from "./api-1/client";
export type * from "./api-1/types";

// Export Share Link API client
export { ShareLinkApiClient } from "./share-link-api/client";
export type * from "./share-link-api/types";

// Export User Service client
export { UserServiceClient } from "./user-service/client";
export type * from "./user-service/types";

/**
 * Default configurations for common environments
 */
export const defaultConfigs = {
	development: {
		api1: { baseURL: "http://localhost:3001" },
		shareLinkApi: { baseURL: "http://localhost:3002" },
		userService: { baseURL: "http://localhost:3003" },
	},
	staging: {
		api1: { baseURL: "https://api-1-staging.example.com" },
		shareLinkApi: { baseURL: "https://share-link-api-staging.example.com" },
		userService: { baseURL: "https://user-service-staging.example.com" },
	},
	production: {
		api1: { baseURL: "https://api-1.example.com" },
		shareLinkApi: { baseURL: "https://share-link-api.example.com" },
		userService: { baseURL: "https://user-service.example.com" },
	},
};
