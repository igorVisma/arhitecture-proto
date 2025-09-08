import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { ApiError, ApiResult, BaseClientConfig, RequestConfig, createSuccessResult, createErrorResult } from "./types";

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
		this.axios.interceptors.response.use((response: AxiosResponse) => {
			console.log(`[API Response] ${response.status} ${response.config.url}`);
			return response;
		});
	}

	/**
	 * Generic request method using discriminated union pattern
	 * Now publicly available for flexible API calls
	 */
	protected async request<TData, TError = ApiError, TRequestData = unknown>(
		requestConfig: RequestConfig<TRequestData>,
	): Promise<ApiResult<TData, TError>> {
		try {
			let response: AxiosResponse<TData, TError>;

			switch (requestConfig.method) {
				case "GET":
					response = await this.axios.get<TData>(requestConfig.endpoint, requestConfig.config);
					break;
				case "POST":
					response = await this.axios.post<TData>(requestConfig.endpoint, requestConfig.data, requestConfig.config);
					break;
				case "PUT":
					response = await this.axios.put<TData>(requestConfig.endpoint, requestConfig.data, requestConfig.config);
					break;
				case "PATCH":
					response = await this.axios.patch<TData>(requestConfig.endpoint, requestConfig.data, requestConfig.config);
					break;
				case "DELETE":
					response = await this.axios.delete<TData>(requestConfig.endpoint, requestConfig.config);
					break;
			}

			return createSuccessResult(response.data);
		} catch (error) {
			const processedError = this.handleError<TError>(error);
			return createErrorResult(processedError);
		}
	}

	/**
	 * Convenience method for GET requests
	 */
	public async get<TData, TError = ApiError>(
		endpoint: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError>({ method: "GET", endpoint, config });
	}

	/**
	 * Convenience method for POST requests
	 */
	public async post<TData, TError = ApiError, TRequestData = unknown>(
		endpoint: string,
		data?: TRequestData,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError, TRequestData>({ method: "POST", endpoint, data, config });
	}

	/**
	 * Convenience method for PUT requests
	 */
	public async put<TData, TError = ApiError, TRequestData = unknown>(
		endpoint: string,
		data?: TRequestData,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError, TRequestData>({ method: "PUT", endpoint, data, config });
	}

	/**
	 * Convenience method for PATCH requests
	 */
	public async patch<TData, TError = ApiError, TRequestData = unknown>(
		endpoint: string,
		data?: TRequestData,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError, TRequestData>({ method: "PATCH", endpoint, data, config });
	}

	/**
	 * Convenience method for DELETE requests
	 */
	public async delete<TData, TError = ApiError>(
		endpoint: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResult<TData, TError>> {
		return this.request<TData, TError>({ method: "DELETE", endpoint, config });
	}

	/**
	 * Error handler that can be overridden by specific clients
	 */
	protected handleError<TError = ApiError>(error: unknown): TError {
		// Handle axios errors with proper type checking
		if (isAxiosError(error)) {
			const apiError: ApiError = {
				message: error.message || "Request failed",
				code: error.code,
				status: error.response?.status,
				details: error.response?.data,
			};

			return apiError;
		}

		const genericError: ApiError = {
			message: error instanceof Error ? error.message : "Unknown error occurred",
			details: error,
		};
		return genericError as TError;
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
