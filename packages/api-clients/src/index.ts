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
