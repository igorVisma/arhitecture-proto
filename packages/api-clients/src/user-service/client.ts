import { BaseApiClient } from "../base-client";
import { BaseClientConfig, ApiResult } from "../types";
import { LoginRequest, LoginResponse, UsersListResponse, UserServiceError } from "./types";

export class UserServiceClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Login user with email and password
	 */
	async login(credentials: LoginRequest): Promise<ApiResult<LoginResponse, UserServiceError>> {
		return this.post<LoginResponse, UserServiceError, LoginRequest>("/auth/login", credentials);
	}

	/**
	 * Get all users with optional filtering
	 */
	async getUsers(params?: URLSearchParams): Promise<ApiResult<UsersListResponse, UserServiceError>> {
		return this.get<UsersListResponse, UserServiceError>("/users", { params });
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
