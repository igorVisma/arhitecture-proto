/**
 * Types for User Service API
 */

export interface User {
	id: number;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	avatar?: string;
	role: UserRole;
	isActive: boolean;
	lastLoginAt?: string;
	createdAt: string;
	updatedAt: string;
}

export type UserRole = "admin" | "moderator" | "user" | "guest";

export interface CreateUserRequest {
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	password: string;
	role?: UserRole;
}

export interface UpdateUserRequest {
	email?: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	avatar?: string;
	role?: UserRole;
	isActive?: boolean;
}

export interface ChangePasswordRequest {
	currentPassword: string;
	newPassword: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: User;
	token: string;
	refreshToken: string;
	expiresIn: number;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface UsersListResponse {
	users: User[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface UsersQueryParams {
	page?: number;
	limit?: number;
	role?: UserRole;
	isActive?: boolean;
	search?: string; // Search by email, username, first name, or last name
}

export interface UserResponse {
	user: User;
}

export interface UserProfile {
	id: number;
	bio?: string;
	website?: string;
	location?: string;
	preferences: {
		theme: "light" | "dark" | "auto";
		language: string;
		timezone: string;
		notifications: {
			email: boolean;
			push: boolean;
			sms: boolean;
		};
	};
}

export interface UpdateUserProfileRequest {
	bio?: string;
	website?: string;
	location?: string;
	preferences?: Partial<UserProfile["preferences"]>;
}

export interface UserServiceError {
	message: string;
	code:
		| "USER_NOT_FOUND"
		| "EMAIL_ALREADY_EXISTS"
		| "USERNAME_ALREADY_EXISTS"
		| "INVALID_CREDENTIALS"
		| "INSUFFICIENT_PERMISSIONS"
		| "TOKEN_EXPIRED"
		| "TOKEN_INVALID"
		| "WEAK_PASSWORD"
		| "SERVER_ERROR";
	status: number;
	field?: string; // For validation errors
}
