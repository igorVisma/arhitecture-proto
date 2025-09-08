/**
 *// Export base classes and types
export { 
	BaseApiClient, 
	type BaseClientConfig, 
	type ApiError, 
	type ApiResult,
	createSuccessResult,
	createErrorResult,
	createLoadingResult
} from './base-client';turbo-proto/api-clients
 *
 * A collection of API clients for different services with TypeScript support
 */

// Export base classes and types
export { BaseApiClient, type BaseClientConfig, type ApiError, type ApiResponse } from "./base-client";

// Export API-1 client
export { Api1Client, createApi1Client } from "./api-1/client";
export type * from "./api-1/types";

// Export Another API client
export { AnotherApiClient, createAnotherApiClient } from "./another-api/client";
export type * from "./another-api/types";

// Export User Service client
export { UserServiceClient, createUserServiceClient } from "./user-service/client";
export type * from "./user-service/types";

// Import types and clients for the factory function
import { Api1Client, createApi1Client } from "./api-1/client";
import { AnotherApiClient, createAnotherApiClient } from "./another-api/client";
import { UserServiceClient, createUserServiceClient } from "./user-service/client";
import { BaseClientConfig } from "./base-client";

// Convenience factory functions for all clients
export const createClients = (configs: {
	api1?: BaseClientConfig;
	anotherApi?: BaseClientConfig;
	userService?: BaseClientConfig;
}) => {
	const clients: {
		api1?: Api1Client;
		anotherApi?: AnotherApiClient;
		userService?: UserServiceClient;
	} = {};

	if (configs.api1) {
		clients.api1 = createApi1Client(configs.api1);
	}

	if (configs.anotherApi) {
		clients.anotherApi = createAnotherApiClient(configs.anotherApi);
	}

	if (configs.userService) {
		clients.userService = createUserServiceClient(configs.userService);
	}

	return clients;
};

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
