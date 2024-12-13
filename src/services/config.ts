// API configuration settings
export const API_CONFIG = {
    BASE_URL: 'https://api.wrt.capital',  // Base API URL
    ENDPOINTS: {
        DEALER_GAMMA: '/dealergamma',      // Dealer gamma endpoint
    },
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json', // Default content type for requests
    }
} as const;

// Type for available API endpoints
export type ApiEndpoint = keyof typeof API_CONFIG.ENDPOINTS;
