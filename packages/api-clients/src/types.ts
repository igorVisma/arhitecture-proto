import { AxiosRequestConfig } from "axios";

/**
 * Base API error interface
 */
export interface ApiError {
	message: string;
	code?: string;
	status?: number;
	details?: unknown;
}

/**
 * API Success Response interface
 */
export interface ApiSuccessResponse<Data> {
	error: null;
	data: Data;
}

/**
 * API Error Response interface
 */
export interface ApiErrorResponse<Error = ApiError> {
	error: Error;
	data: null;
}

/**
 * Standardized API result wrapper for all API calls
 */
export type ApiResult<TData, TError = ApiError> = ApiSuccessResponse<TData> | ApiErrorResponse<TError>;

/**
 * Success result helper
 */
export const createSuccessResult = <TData, TError = ApiError>(data: TData): ApiResult<TData, TError> => ({
	data,
	error: null,
});

/**
 * Error result helper
 */
export const createErrorResult = <TData, TError = ApiError>(error: TError): ApiResult<TData, TError> => ({
	data: null,
	error,
});

/**
 * HTTP method configurations using discriminated union pattern
 */
export type RequestConfig<TRequestData = unknown> =
	| {
			method: "GET";
			endpoint: string;
			config?: AxiosRequestConfig;
	  }
	| {
			method: "POST";
			endpoint: string;
			data?: TRequestData;
			config?: AxiosRequestConfig;
	  }
	| {
			method: "PUT";
			endpoint: string;
			data?: TRequestData;
			config?: AxiosRequestConfig;
	  }
	| {
			method: "PATCH";
			endpoint: string;
			data?: TRequestData;
			config?: AxiosRequestConfig;
	  }
	| {
			method: "DELETE";
			endpoint: string;
			config?: AxiosRequestConfig;
	  };

/**
 * Base configuration for API clients
 */
export interface BaseClientConfig {
	baseURL: string;
	timeout?: number;
	headers?: Record<string, string>;
	retries?: number;
}
