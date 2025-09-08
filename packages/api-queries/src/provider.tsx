import React, { createContext, useContext, ReactNode } from "react";
import type { VismaSignApiClient, ShareLinkApiClient, UserServiceClient } from "@repo/api-clients";

/**
 * API clients context type
 */
export interface ApiClientsContextType {
	vismaSignApi: VismaSignApiClient;
	shareLinkApi: ShareLinkApiClient;
	userService: UserServiceClient;
}

/**
 * Context for API clients
 */
const ApiClientsContext = createContext<ApiClientsContextType | null>(null);

/**
 * Props for ApiClientsProvider
 */
export interface ApiClientsProviderProps {
	children: ReactNode;
	clients: ApiClientsContextType;
}

/**
 * Provider component that makes API clients available to hooks
 */
export function ApiClientsProvider({ children, clients }: ApiClientsProviderProps) {
	return <ApiClientsContext.Provider value={clients}>{children}</ApiClientsContext.Provider>;
}

/**
 * Hook to get API clients from context
 */
export function useApiClients(): ApiClientsContextType {
	const context = useContext(ApiClientsContext);
	if (!context) {
		throw new Error("useApiClients must be used within an ApiClientsProvider");
	}
	return context;
}

/**
 * Hook to get a specific API client
 */
export function useApiClient<T extends keyof ApiClientsContextType>(clientName: T): ApiClientsContextType[T] {
	const clients = useApiClients();
	return clients[clientName];
}
