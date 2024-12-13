import { API_CONFIG } from './config';

// Custom error class for API-specific errors
export class ApiError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        public data?: any
    ) {
        super(`API Error: ${status} ${statusText}`);
        this.name = 'ApiError';
    }
}

// Singleton API client for managing API requests
export class ApiClient {
    private static instance: ApiClient;
    private apiKey?: string;

    private constructor() {}

    // Get or create singleton instance
    static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    // Set API key for authentication
    setApiKey(apiKey: string): void {
        this.apiKey = apiKey;
    }

    // Build request headers with optional auth
    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            ...API_CONFIG.DEFAULT_HEADERS,
        };

        if (this.apiKey) {
            headers['Authorization'] = `Bearer ${this.apiKey}`;
        }

        return headers;
    }

    // Handle API response and errors
    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new ApiError(response.status, response.statusText, errorData);
        }

        return response.json() as Promise<T>;
    }

    // GET request with query params support
    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: this.getHeaders(),
        });

        return this.handleResponse<T>(response);
    }
}
