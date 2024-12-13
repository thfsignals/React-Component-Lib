import { ApiClient } from './apiClient';
import { API_CONFIG } from './config';
import { DealerGammaResponse } from './types';

// Service for handling dealer gamma data operations
export class DealerGammaService {
    private static instance: DealerGammaService;
    private apiClient: ApiClient;

    private constructor() {
        this.apiClient = ApiClient.getInstance();
    }

    // Get or create singleton instance
    static getInstance(): DealerGammaService {
        if (!DealerGammaService.instance) {
            DealerGammaService.instance = new DealerGammaService();
        }
        return DealerGammaService.instance;
    }

    /**
     * Fetches dealer gamma data for a specific symbol
     * @param symbol - Stock symbol (e.g., 'SPY')
     * @returns Promise with gamma data response
     */
    async getGammaData(symbol: string): Promise<DealerGammaResponse> {
        return this.apiClient.get<DealerGammaResponse>(
            `${API_CONFIG.ENDPOINTS.DEALER_GAMMA}/${symbol}`
        );
    }

    /**
     * Formats gamma data for table display
     * @param data - Raw API response
     * @returns Formatted array for THFtable
     */
    transformGammaDataForTable(data: DealerGammaResponse) {
        return data.gammas.map(point => ({
            symbol: data.symbol,
            zerogex: data.zerogex,
            ...point
        }));
    }
}
