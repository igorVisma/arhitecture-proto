import { BaseApiClient } from "../base-client";
import { BaseClientConfig, ApiResult } from "../types";
import { LoginRequest, LoginResponse, UsersListResponse, UserServiceError } from "./types";

export class UserServiceClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Login user with email and password
	 * @method POST /auth/login
	 */
	async login(credentials: LoginRequest) {
		return this.post<LoginResponse, UserServiceError, LoginRequest>("/auth/login", credentials);
	}

	/**
	 * Get all users with optional filtering
	 * @method GET /users
	 */
	async getUsers(params?: URLSearchParams) {
		return this.get<UsersListResponse, UserServiceError>("/users", { params });
	}
}

// Export types for external use
export * from "./types";
