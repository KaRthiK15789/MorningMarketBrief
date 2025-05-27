import { MarketData, PortfolioData } from '@/hooks/useMarketData';

// Asian tech stocks data
const asianTechStocks = [
{ symbol: 'TSM', name: 'Taiwan Semiconductor', basePrice: 102.50 },
{ symbol: '005930.KS', name: 'Samsung Electronics', basePrice: 71200 },
{ symbol: 'BABA', name: 'Alibaba Group', basePrice: 73.80 },
{ symbol: 'TCEHY', name: 'Tencent Holdings', basePrice: 38.20 },
{ symbol: '9988.HK', name: 'Alibaba Group HK', basePrice: 72.15 },
{ symbol: '700.HK', name: 'Tencent HK', basePrice: 295.20 },
{ symbol: 'ASML', name: 'ASML Holding', basePrice: 745.30 },
{ symbol: 'SONY', name: 'Sony Group Corp', basePrice: 89.45 }];


// Portfolio sectors
const portfolioSectors = [
{ name: 'Technology', baseAllocation: 35 },
{ name: 'Healthcare', baseAllocation: 18 },
{ name: 'Financial Services', baseAllocation: 15 },
{ name: 'Consumer Discretionary', baseAllocation: 12 },
{ name: 'Industrials', baseAllocation: 10 },
{ name: 'Energy', baseAllocation: 6 },
{ name: 'Utilities', baseAllocation: 4 }];


// Generate random price movement
const generatePriceMovement = (basePrice: number, volatility: number = 0.02): {price: number;change: number;changePercent: number;} => {
  const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
  const changePercent = randomFactor * volatility * 100;
  const change = basePrice * (changePercent / 100);
  const price = basePrice + change;

  return {
    price: Number(price.toFixed(2)),
    change: Number(change.toFixed(2)),
    changePercent: Number(changePercent.toFixed(2))
  };
};

// Generate earnings data
const generateEarningsData = () => {
  const earningsCompanies = [
  { symbol: 'TSM', company: 'Taiwan Semiconductor', expected: 1.85 },
  { symbol: '005930.KS', company: 'Samsung Electronics', expected: 0.95 },
  { symbol: 'BABA', company: 'Alibaba Group', expected: 1.42 },
  { symbol: 'TCEHY', company: 'Tencent Holdings', expected: 0.68 },
  { symbol: 'SONY', company: 'Sony Group Corp', expected: 1.15 }];


  return earningsCompanies.map((company) => {
    const surprisePercent = (Math.random() - 0.5) * 20; // -10% to +10%
    const actual = company.expected * (1 + surprisePercent / 100);
    const surprise = actual - company.expected;

    return {
      ...company,
      actual: Number(actual.toFixed(2)),
      surprise: Number(surprise.toFixed(2)),
      surprisePercent: Number(surprisePercent.toFixed(2)),
      date: new Date().toISOString().split('T')[0]
    };
  });
};

// Generate news feed
const generateNewsFeed = () => {
  const newsTemplates = [
  {
    headline: "Asian markets rally on positive earnings",
    summary: "Technology stocks lead gains across major Asian exchanges",
    impact: 'high' as const,
    sentiment: 'positive' as const
  },
  {
    headline: "Central bank policy uncertainty weighs on sentiment",
    summary: "Rising yields prompt caution among institutional investors",
    impact: 'medium' as const,
    sentiment: 'negative' as const
  },
  {
    headline: "Semiconductor demand remains robust",
    summary: "AI and cloud computing drive continued chip demand",
    impact: 'high' as const,
    sentiment: 'positive' as const
  },
  {
    headline: "Currency fluctuations impact regional trade",
    summary: "USD strength affects Asian export competitiveness",
    impact: 'medium' as const,
    sentiment: 'neutral' as const
  }];


  return newsTemplates.map((template, index) => ({
    id: `news-${Date.now()}-${index}`,
    ...template,
    timestamp: new Date(Date.now() - Math.random() * 3600000) // Within last hour
  }));
};

export const generateMockMarketData = (): MarketData => {
  const asianStocks = asianTechStocks.map((stock) => ({
    symbol: stock.symbol,
    name: stock.name,
    volume: Math.floor(Math.random() * 10000000) + 1000000,
    ...generatePriceMovement(stock.basePrice, 0.03)
  }));

  const earnings = generateEarningsData();
  const newsFeed = generateNewsFeed();

  // Calculate market sentiment
  const avgChangePercent = asianStocks.reduce((sum, stock) => sum + stock.changePercent, 0) / asianStocks.length;
  const sentimentScore = Math.max(0, Math.min(100, 50 + avgChangePercent * 5));

  let overall: 'bullish' | 'bearish' | 'neutral' = 'neutral';
  if (sentimentScore > 60) overall = 'bullish';else
  if (sentimentScore < 40) overall = 'bearish';

  const factors = [];
  if (avgChangePercent > 1) factors.push('Strong earnings performance');
  if (avgChangePercent < -1) factors.push('Market volatility concerns');
  factors.push('Central bank policy uncertainty');
  factors.push('Geopolitical tensions');

  return {
    totalAUM: '2.4B',
    activePositions: 127,
    asianStocks,
    earnings,
    marketSentiment: {
      overall,
      score: Math.round(sentimentScore),
      factors
    },
    newsFeed
  };
};

export const generateMockPortfolioData = (): PortfolioData => {
  const baseAsiaTechAllocation = 22;
  const asiaTechAllocation = baseAsiaTechAllocation + (Math.random() - 0.5) * 4;

  const sectors = portfolioSectors.map((sector) => ({
    name: sector.name,
    allocation: sector.baseAllocation + (Math.random() - 0.5) * 4,
    performance: (Math.random() - 0.5) * 10,
    riskLevel: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low' as 'low' | 'medium' | 'high'
  }));

  const positions = asianTechStocks.slice(0, 5).map((stock) => {
    const shares = Math.floor(Math.random() * 1000) + 100;
    const avgCost = stock.basePrice * (0.9 + Math.random() * 0.2);
    const currentPrice = stock.basePrice + (Math.random() - 0.5) * stock.basePrice * 0.1;
    const unrealizedGain = (currentPrice - avgCost) * shares;
    const unrealizedGainPercent = (currentPrice - avgCost) / avgCost * 100;

    return {
      symbol: stock.symbol,
      name: stock.name,
      shares,
      avgCost: Number(avgCost.toFixed(2)),
      currentPrice: Number(currentPrice.toFixed(2)),
      unrealizedGain: Number(unrealizedGain.toFixed(2)),
      unrealizedGainPercent: Number(unrealizedGainPercent.toFixed(2)),
      weight: Math.random() * 10 + 2
    };
  });

  const performance = {
    daily: (Math.random() - 0.5) * 4,
    weekly: (Math.random() - 0.5) * 8,
    monthly: (Math.random() - 0.5) * 15,
    ytd: (Math.random() - 0.5) * 25
  };

  return {
    asiaTechAllocation: Number(asiaTechAllocation.toFixed(1)),
    previousAllocation: 18,
    riskScore: Number((5 + Math.random() * 3).toFixed(1)),
    sectors,
    positions,
    performance
  };
};