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

	// Authentication methods

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
	 * Refresh authentication token
	 */
	async refreshToken(refreshData: RefreshTokenRequest): Promise<ApiResult<LoginResponse, UserServiceError>> {
		const result = await this.post<LoginResponse, UserServiceError, RefreshTokenRequest>("/auth/refresh", refreshData);

		// Update auth token after refresh
		if (result.data?.token) {
			this.setAuthToken(result.data.token);
		}

		return result;
	}

	/**
	 * Logout current user
	 */
	async logout(): Promise<ApiResult<void, UserServiceError>> {
		const result = await this.post<void, UserServiceError>("/auth/logout");
		this.removeAuthToken();
		return result;
	}

	// User management methods

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
	 * Get a single user by ID
	 */
	async getUser(id: number): Promise<ApiResult<UserResponse, UserServiceError>> {
		return this.get<UserResponse, UserServiceError>(`/users/${id}`);
	}

	/**
	 * Get current authenticated user
	 */
	async getCurrentUser(): Promise<ApiResult<UserResponse, UserServiceError>> {
		return this.get<UserResponse, UserServiceError>("/users/me");
	}

	/**
	 * Create a new user
	 */
	async createUser(userData: CreateUserRequest): Promise<ApiResult<UserResponse, UserServiceError>> {
		return this.post<UserResponse, UserServiceError, CreateUserRequest>("/users", userData);
	}

	/**
	 * Update an existing user
	 */
	async updateUser(id: number, userData: UpdateUserRequest): Promise<ApiResult<UserResponse, UserServiceError>> {
		return this.put<UserResponse, UserServiceError, UpdateUserRequest>(`/users/${id}`, userData);
	}

	/**
	 * Update current user
	 */
	async updateCurrentUser(userData: UpdateUserRequest): Promise<ApiResult<UserResponse, UserServiceError>> {
		return this.put<UserResponse, UserServiceError, UpdateUserRequest>("/users/me", userData);
	}

	/**
	 * Delete a user
	 */
	async deleteUser(id: number): Promise<ApiResult<void, UserServiceError>> {
		return this.delete<void, UserServiceError>(`/users/${id}`);
	}

	/**
	 * Deactivate a user (soft delete)
	 */
	async deactivateUser(id: number): Promise<ApiResult<UserResponse, UserServiceError>> {
		return this.updateUser(id, { isActive: false });
	}

	/**
	 * Activate a user
	 */
	async activateUser(id: number): Promise<ApiResult<UserResponse, UserServiceError>> {
		return this.updateUser(id, { isActive: true });
	}

	// Password management

	/**
	 * Change user password
	 */
	async changePassword(passwordData: ChangePasswordRequest): Promise<ApiResult<void, UserServiceError>> {
		return this.post<void, UserServiceError, ChangePasswordRequest>("/users/me/change-password", passwordData);
	}

	/**
	 * Reset password (admin only)
	 */
	async resetUserPassword(id: number, newPassword: string): Promise<ApiResult<void, UserServiceError>> {
		return this.post<void, UserServiceError>(`/users/${id}/reset-password`, { newPassword });
	}

	// Profile management

	/**
	 * Get user profile
	 */
	async getUserProfile(id: number): Promise<ApiResult<UserProfile, UserServiceError>> {
		return this.get<UserProfile, UserServiceError>(`/users/${id}/profile`);
	}

	/**
	 * Get current user profile
	 */
	async getCurrentUserProfile(): Promise<ApiResult<UserProfile, UserServiceError>> {
		return this.get<UserProfile, UserServiceError>("/users/me/profile");
	}

	/**
	 * Update user profile
	 */
	async updateUserProfile(
		id: number,
		profileData: UpdateUserProfileRequest,
	): Promise<ApiResult<UserProfile, UserServiceError>> {
		return this.put<UserProfile, UserServiceError, UpdateUserProfileRequest>(`/users/${id}/profile`, profileData);
	}

	/**
	 * Update current user profile
	 */
	async updateCurrentUserProfile(
		profileData: UpdateUserProfileRequest,
	): Promise<ApiResult<UserProfile, UserServiceError>> {
		return this.put<UserProfile, UserServiceError, UpdateUserProfileRequest>("/users/me/profile", profileData);
	}

	// Convenience methods

	/**
	 * Get users by role
	 */
	async getUsersByRole(role: UserRole): Promise<ApiResult<UsersListResponse, UserServiceError>> {
		return this.getUsers({ role });
	}

	/**
	 * Get active users only
	 */
	async getActiveUsers(): Promise<ApiResult<UsersListResponse, UserServiceError>> {
		return this.getUsers({ isActive: true });
	}

	/**
	 * Search users by email, username, or name
	 */
	async searchUsers(searchTerm: string, limit?: number): Promise<ApiResult<UsersListResponse, UserServiceError>> {
		return this.getUsers({ search: searchTerm, limit });
	}

	/**
	 * Get admin users
	 */
	async getAdminUsers(): Promise<ApiResult<UsersListResponse, UserServiceError>> {
		return this.getUsersByRole("admin");
	}

	/**
	 * Upload user avatar
	 */
	async uploadAvatar(file: File): Promise<ApiResult<UserResponse, UserServiceError>> {
		const formData = new FormData();
		formData.append("avatar", file);

		return this.post<UserResponse, UserServiceError>("/users/me/avatar", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
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
