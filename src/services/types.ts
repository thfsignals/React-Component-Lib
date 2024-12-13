// Single gamma point with strike price and gamma value
export interface GammaPoint {
    strike: number;    // Strike price
    gamma: number;     // Gamma value at strike
}

// Complete dealer gamma response from API
export interface DealerGammaResponse {
    symbol: string;    // Stock symbol
    zerogex: number;   // Zero gamma exchange level
    gammas: GammaPoint[]; // Array of gamma points
}

// Add more interfaces as needed for other API responses
