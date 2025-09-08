import { BaseApiClient, BaseClientConfig, ApiResult } from "../base-client";
import {
	User,
	CreateUserRequest,
	UpdateUserRequest,
	ChangePasswordRequest,
	LoginRequest,
	LoginResponse,
	RefreshTokenRequest,
	UsersListResponse,
	UsersQueryParams,
	UserResponse,
	UserProfile,
	UpdateUserProfileRequest,
	UserServiceError,
	UserRole,
} from "./types";

/**
 * User Service API Client for user management and authentication
 *
 * @example
 * ```typescript
 * const userServiceClient = new UserServiceClient({
 *   baseURL: 'https://user-service.example.com/api/v1'
 * });
 *
 * // Login user
 * const loginResult = await userServiceClient.login({
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 *
 * // Set auth token for subsequent requests
 * userServiceClient.setAuthToken(loginResult.token);
 *
 * // Get current user profile
 * const profile = await userServiceClient.getCurrentUser();
 *
 * // Get all users (admin only)
 * const users = await userServiceClient.getUsers();
 * ```
 */
export class UserServiceClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Login user with email and password
	 */
	async login(credentials: LoginRequest): Promise<ApiResult<LoginResponse, UserServiceError>> {
		const result = await this.post<LoginResponse, UserServiceError, LoginRequest>("/auth/login", credentials);

		// Automatically set auth token after successful login
		if (result.data?.token) {
			this.setAuthToken(result.data.token);
		}

		return result;
	}

	/**
	 * Get all users with optional filtering
	 */
	async getUsers(params?: UsersQueryParams): Promise<ApiResult<UsersListResponse, UserServiceError>> {
		const queryParams = new URLSearchParams();

		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());
		if (params?.role) queryParams.append("role", params.role);
		if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());
		if (params?.search) queryParams.append("search", params.search);

		const endpoint = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

		return this.get<UsersListResponse, UserServiceError>(endpoint);
	}

	/**
	 * Override error handler for User Service specific errors
	 */
	protected handleError(error: unknown): UserServiceError {
		// Handle User Service specific error format
		if (error && typeof error === "object" && "details" in error) {
			const details = (error as any).details;
			if (details && typeof details === "object" && "code" in details) {
				const userServiceError = details as UserServiceError;
				return {
					message: userServiceError.message,
					code: userServiceError.code,
					status: userServiceError.status,
					field: userServiceError.field,
				};
			}
		}

		// Convert generic error to UserServiceError
		const baseError = super.handleError(error);
		return {
			message: baseError.message,
			code: "SERVER_ERROR" as const,
			status: baseError.status || 500,
		};
	}
}

/**
 * Factory function to create User Service client instance
 */
export const createUserServiceClient = (config: BaseClientConfig): UserServiceClient => {
	return new UserServiceClient(config);
};

// Export types for external use
export * from "./types";
