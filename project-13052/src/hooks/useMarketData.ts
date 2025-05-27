import { useState, useEffect } from 'react';
import { generateMockMarketData, generateMockPortfolioData } from '@/services/MarketDataService';

export interface MarketData {
  totalAUM: string;
  activePositions: number;
  asianStocks: Array<{
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
  }>;
  earnings: Array<{
    symbol: string;
    company: string;
    expected: number;
    actual: number;
    surprise: number;
    surprisePercent: number;
    date: string;
  }>;
  marketSentiment: {
    overall: 'bullish' | 'bearish' | 'neutral';
    score: number;
    factors: string[];
  };
  newsFeed: Array<{
    id: string;
    headline: string;
    summary: string;
    timestamp: Date;
    impact: 'high' | 'medium' | 'low';
    sentiment: 'positive' | 'negative' | 'neutral';
  }>;
}

export interface PortfolioData {
  asiaTechAllocation: number;
  previousAllocation: number;
  riskScore: number;
  sectors: Array<{
    name: string;
    allocation: number;
    performance: number;
    riskLevel: 'low' | 'medium' | 'high';
  }>;
  positions: Array<{
    symbol: string;
    name: string;
    shares: number;
    avgCost: number;
    currentPrice: number;
    unrealizedGain: number;
    unrealizedGainPercent: number;
    weight: number;
  }>;
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
    ytd: number;
  };
}

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);

      // Simulate API loading time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const initialMarketData = generateMockMarketData();
      const initialPortfolioData = generateMockPortfolioData();

      setMarketData(initialMarketData);
      setPortfolioData(initialPortfolioData);
      setLastUpdateTime(new Date());
      setIsLoading(false);
    };

    initializeData();
  }, []);

  // Update data every 30 seconds to simulate real-time updates
  useEffect(() => {
    if (!marketData || !portfolioData) return;

    const interval = setInterval(() => {
      const updatedMarketData = generateMockMarketData();
      const updatedPortfolioData = generateMockPortfolioData();

      setMarketData(updatedMarketData);
      setPortfolioData(updatedPortfolioData);
      setLastUpdateTime(new Date());

      console.log('Market data updated:', new Date().toLocaleTimeString());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [marketData, portfolioData]);

  // Function to manually refresh data
  const refreshData = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newMarketData = generateMockMarketData();
    const newPortfolioData = generateMockPortfolioData();

    setMarketData(newMarketData);
    setPortfolioData(newPortfolioData);
    setLastUpdateTime(new Date());
    setIsLoading(false);
  };

  return {
    marketData,
    portfolioData,
    isLoading,
    lastUpdateTime,
    refreshData
  };
};