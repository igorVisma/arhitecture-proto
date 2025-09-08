import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse, UsersListResponse, UserServiceError } from "@repo/api-clients";
import { useApiClient } from "../provider";

/**
 * Query keys for User Service API
 */
export const userServiceQueryKeys = {
	all: ["user-service"] as const,
	users: () => [...userServiceQueryKeys.all, "users"] as const,
	usersList: (params?: URLSearchParams) => [...userServiceQueryKeys.users(), "list", params?.toString()] as const,
	auth: () => [...userServiceQueryKeys.all, "auth"] as const,
} as const;

/**
 * Hook to fetch users with TanStack Query
 */
export function useUsers(params?: URLSearchParams) {
	const client = useApiClient("userService");

	return useQuery({
		queryKey: userServiceQueryKeys.usersList(params),
		queryFn: async () => {
			const result = await client.getUsers(params);

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result.data;
		},
	});
}

/**
 * Hook to login with TanStack Query
 */
export function useLogin() {
	const client = useApiClient("userService");
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (credentials: LoginRequest) => {
			const result = await client.login(credentials);

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result.data;
		},
		onSuccess: (data) => {
			// Invalidate user queries after successful login
			queryClient.invalidateQueries({
				queryKey: userServiceQueryKeys.users(),
			});
		},
	});
}

/**
 * Custom hook for users with loading and error states
 */
export function useUsersWithStates(params?: URLSearchParams) {
	const query = useUsers(params);

	return {
		users: query.data?.users || [],
		pagination: query.data?.pagination,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error?.message,
		refetch: query.refetch,
	};
}

/**
 * Custom hook for login with loading states
 */
export function useLoginWithStates() {
	const mutation = useLogin();

	return {
		login: mutation.mutate,
		loginAsync: mutation.mutateAsync,
		isLoggingIn: mutation.isPending,
		isError: mutation.isError,
		isSuccess: mutation.isSuccess,
		user: mutation.data?.user,
		token: mutation.data?.token,
		error: mutation.error?.message,
		reset: mutation.reset,
	};
}
