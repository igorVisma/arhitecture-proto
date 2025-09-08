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

// Export Another API client
export { AnotherApiClient } from "./another-api/client";
export type * from "./another-api/types";

// Export User Service client
export { UserServiceClient } from "./user-service/client";
export type * from "./user-service/types";

/**
 * Default configurations for common environments
 */
export const defaultConfigs = {
	development: {
		api1: { baseURL: "http://localhost:3001" },
		anotherApi: { baseURL: "http://localhost:3002" },
		userService: { baseURL: "http://localhost:3003" },
	},
	staging: {
		api1: { baseURL: "https://api-1-staging.example.com" },
		anotherApi: { baseURL: "https://another-api-staging.example.com" },
		userService: { baseURL: "https://user-service-staging.example.com" },
	},
	production: {
		api1: { baseURL: "https://api-1.example.com" },
		anotherApi: { baseURL: "https://another-api.example.com" },
		userService: { baseURL: "https://user-service.example.com" },
	},
};
