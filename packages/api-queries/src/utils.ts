import type { ApiResult } from "@repo/api-clients/src/types";

/**
 * Unwraps an API result by either returning the data or throwing the error
 * @param result The API result to unwrap
 * @returns The data from the API result
 * @throws The error from the API result if present
 */
export function unwrapResult<TData, TError>(result: ApiResult<TData, TError>): TData {
	const { data, error } = result;
	if (error) {
		throw error;
	}
	return data;
}
