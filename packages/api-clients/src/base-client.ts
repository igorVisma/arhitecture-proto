import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

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
 * Standardized API result wrapper for all API calls
 */
export interface ApiResult<TData, TError = ApiError> {
	data: TData | null;
	error: TError | null;
	isFetching: boolean;
}

/**
 * Success result helper
 */
export const createSuccessResult = <TData>(data: TData): ApiResult<TData> => ({
	data,
	error: null,
	isFetching: false,
});

/**
 * Error result helper
 */
export const createErrorResult = <TData, TError = ApiError>(error: TError): ApiResult<TData, TError> => ({
	data: null,
	error,
	isFetching: false,
});

/**
 * Loading result helper
 */
export const createLoadingResult = <TData, TError = ApiError>(): ApiResult<TData, TError> => ({
	data: null,
	error: null,
	isFetching: true,
});

/**
 * Base configuration for API clients
 */
export interface BaseClientConfig {
	baseURL: string;
	timeout?: number;
	headers?: Record<string, string>;
	retries?: number;
}

/**
 * Base API client class that other clients can extend
 */
export abstract class BaseApiClient {
	protected readonly axios: AxiosInstance;
	protected readonly baseURL: string;

	constructor(config: BaseClientConfig) {
		this.baseURL = config.baseURL;

		this.axios = axios.create({
			baseURL: config.baseURL,
			timeout: config.timeout || 10000,
			headers: {
				"Content-Type": "application/json",
				...config.headers,
			},
		});

		this.setupInterceptors();
	}

	private setupInterceptors(): void {
		// Request interceptor
		this.axios.interceptors.request.use(
			(config) => {
				console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
				return config;
			},
			(error) => {
				console.error("[API Request Error]", error);
				return Promise.reject(error);
			},
		);

		// Response interceptor
		this.axios.interceptors.response.use(
			(response: AxiosResponse) => {
				console.log(`[API Response] ${response.status} ${response.config.url}`);
				return response;
			},
			(error) => {
				const apiError: ApiError = {
					message: error.message || "An error occurred",
					status: error.response?.status,
					code: error.code,
					details: error.response?.data,
				};

				console.error("[API Response Error]", apiError);
				return Promise.reject(apiError);
			},
		);
	}

	/**
	 * Generic request method that returns standardized ApiResult
	 */
	protected async request<TData, TError = ApiError>(
		method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
		endpoint: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		try {
			let response: AxiosResponse<TData>;

			switch (method) {
				case "GET":
					response = await this.axios.get<TData>(endpoint, config);
					break;
				case "POST":
					response = await this.axios.post<TData>(endpoint, data, config);
					break;
				case "PUT":
					response = await this.axios.put<TData>(endpoint, data, config);
					break;
				case "PATCH":
					response = await this.axios.patch<TData>(endpoint, data, config);
					break;
				case "DELETE":
					response = await this.axios.delete<TData>(endpoint, config);
					break;
			}

			return createSuccessResult(response.data);
		} catch (error) {
			const processedError = this.handleError(error) as TError;
			return createErrorResult<TData, TError>(processedError);
		}
	}

	/**
	 * Generic GET request method
	 */
	protected async get<TData, TError = ApiError>(
		endpoint: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError>("GET", endpoint, undefined, config);
	}

	/**
	 * Generic POST request method
	 */
	protected async post<TData, TError = ApiError, TRequestData = unknown>(
		endpoint: string,
		data?: TRequestData,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError>("POST", endpoint, data, config);
	}

	/**
	 * Generic PUT request method
	 */
	protected async put<TData, TError = ApiError, TRequestData = unknown>(
		endpoint: string,
		data?: TRequestData,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError>("PUT", endpoint, data, config);
	}

	/**
	 * Generic PATCH request method
	 */
	protected async patch<TData, TError = ApiError, TRequestData = unknown>(
		endpoint: string,
		data?: TRequestData,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError>("PATCH", endpoint, data, config);
	}

	/**
	 * Generic DELETE request method
	 */
	protected async delete<TData, TError = ApiError>(
		endpoint: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError>("DELETE", endpoint, undefined, config);
	}

	/**
	 * Error handler that can be overridden by specific clients
	 */
	protected handleError(error: unknown): ApiError {
		if (error && typeof error === "object" && "message" in error) {
			return error as ApiError;
		}

		return {
			message: "Unknown error occurred",
			details: error,
		};
	}

	/**
	 * Set authentication token
	 */
	public setAuthToken(token: string): void {
		this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}

	/**
	 * Remove authentication token
	 */
	public removeAuthToken(): void {
		delete this.axios.defaults.headers.common["Authorization"];
	}
}
