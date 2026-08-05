// lib/coingecko.ts

export interface CryptoCoin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
}

const BASE_URL = "https://api.coingecko.com/api/v3";

/*
 * Fetch top market cap coins (for Home Page / Top Movers)
 */
export async function getTopCoins(limit = 10): Promise<CryptoCoin[]> {
    try {
        const response = await fetch(
            `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
            {
                // Revalidate cache every 60 seconds so you don't hit rate limits
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            throw new Error(`CoinGecko API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching top coins:", error);
        return [];
    }
}

/*
 * Fetch detailed data for a specific coin (for Coin Details Page [id])
 */
export async function getCoinDetails(coinId: string) {
    try {
        const response = await fetch(
            `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
            {
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch coin details for ${coinId}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching coin details for ${coinId}:`, error);
        return null;
    }
}

/**
 * Fetch historical chart data for a coin (1d, 7d, 30d, etc.)
 */
export async function getCoinChartData(coinId: string, days = 1) {
    try {
        const response = await fetch(
            `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
            { next: { revalidate: 60 } }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch chart data for ${coinId}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching chart data for ${coinId}:`, error);
        return null;
    }
}

/**
 * Search coins by query string
 */
export async function searchCoins(query: string) {
    try {
        const response = await fetch(
            `${BASE_URL}/search?query=${encodeURIComponent(query)}`,
            { next: { revalidate: 60 } }
        );

        if (!response.ok) {
            throw new Error("Search request failed");
        }

        const data = await response.json();
        return data.coins || [];
    } catch (error) {
        console.error("Error searching coins:", error);
        return [];
    }
}

export async function getCoinsMarkets(page = 1, perPage = 10) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`,
      { next: { revalidate: 60 } } // caches data for 60 seconds
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch market data: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching coins markets:", error);
    return [];
  }
}