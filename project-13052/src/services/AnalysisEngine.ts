import { MarketData, PortfolioData } from '@/hooks/useMarketData';

export const generateMarketBrief = (
query: string,
portfolioData: PortfolioData | null,
marketData: MarketData | null)
: string => {
  if (!portfolioData || !marketData) {
    return "I'm sorry, I don't have access to current market data. Please try again in a moment.";
  }

  // Analyze query intent
  const isRiskQuery = query.includes('risk') || query.includes('exposure');
  const isEarningsQuery = query.includes('earnings') || query.includes('surprise');
  const isAllocationQuery = query.includes('allocation') || query.includes('asia') || query.includes('tech');
  const isPerformanceQuery = query.includes('performance') || query.includes('return');
  const isGeneralBrief = query.includes('brief') || query.includes('summary') || query.includes('overview');

  // Generate comprehensive response for general brief or specific queries
  if (isGeneralBrief || isRiskQuery && isEarningsQuery || !isRiskQuery && !isEarningsQuery && !isAllocationQuery && !isPerformanceQuery) {
    return generateComprehensiveBrief(portfolioData, marketData);
  }

  if (isAllocationQuery) {
    return generateAllocationBrief(portfolioData, marketData);
  }

  if (isRiskQuery) {
    return generateRiskBrief(portfolioData, marketData);
  }

  if (isEarningsQuery) {
    return generateEarningsBrief(marketData);
  }

  if (isPerformanceQuery) {
    return generatePerformanceBrief(portfolioData, marketData);
  }

  // Default comprehensive response
  return generateComprehensiveBrief(portfolioData, marketData);
};

const generateComprehensiveBrief = (portfolioData: PortfolioData, marketData: MarketData): string => {
  const allocChange = portfolioData.asiaTechAllocation - portfolioData.previousAllocation;
  const allocDirection = allocChange > 0 ? 'up' : 'down';

  // Get earnings surprises
  const surprises = marketData.earnings.filter((e) => Math.abs(e.surprisePercent) > 2);
  const positiveEarnings = surprises.filter((e) => e.surprisePercent > 0);
  const negativeEarnings = surprises.filter((e) => e.surprisePercent < 0);

  // Market sentiment analysis
  const sentiment = marketData.marketSentiment.overall;
  const sentimentDescription = getSentimentDescription(sentiment, marketData.marketSentiment.score);

  let brief = `Today, your Asia tech allocation is ${portfolioData.asiaTechAllocation}% of AUM, ${allocDirection} from ${portfolioData.previousAllocation}% yesterday. `;

  // Add earnings highlights
  if (positiveEarnings.length > 0) {
    const topEarning = positiveEarnings.reduce((max, e) => e.surprisePercent > max.surprisePercent ? e : max);
    brief += `${topEarning.company} beat estimates by ${Math.abs(topEarning.surprisePercent).toFixed(1)}%. `;
  }

  if (negativeEarnings.length > 0) {
    const worstEarning = negativeEarnings.reduce((min, e) => e.surprisePercent < min.surprisePercent ? e : min);
    brief += `${worstEarning.company} missed by ${Math.abs(worstEarning.surprisePercent).toFixed(1)}%. `;
  }

  // Add sentiment and risk context
  brief += `Regional sentiment is ${sentiment} ${sentimentDescription}. `;
  brief += `Your current risk score is ${portfolioData.riskScore} out of 10. `;

  // Add key risk factors
  if (marketData.marketSentiment.factors.length > 0) {
    const keyFactor = marketData.marketSentiment.factors[0];
    brief += `Key factor to watch: ${keyFactor.toLowerCase()}.`;
  }

  return brief;
};

const generateAllocationBrief = (portfolioData: PortfolioData, marketData: MarketData): string => {
  const allocChange = portfolioData.asiaTechAllocation - portfolioData.previousAllocation;
  const allocDirection = allocChange > 0 ? 'increased' : 'decreased';
  const changeAmount = Math.abs(allocChange);

  let brief = `Your Asia tech allocation currently stands at ${portfolioData.asiaTechAllocation}% of total AUM. `;
  brief += `This has ${allocDirection} by ${changeAmount.toFixed(1)} percentage points from yesterday's ${portfolioData.previousAllocation}%. `;

  // Add context about top holdings
  const topPositions = portfolioData.positions.
  sort((a, b) => b.weight - a.weight).
  slice(0, 3);

  if (topPositions.length > 0) {
    brief += `Your largest positions include ${topPositions.map((p) => p.name).join(', ')}. `;
  }

  // Add performance context
  if (portfolioData.performance.daily > 0) {
    brief += `The allocation is performing well today with a ${portfolioData.performance.daily.toFixed(2)}% gain.`;
  } else {
    brief += `The allocation is down ${Math.abs(portfolioData.performance.daily).toFixed(2)}% today.`;
  }

  return brief;
};

const generateRiskBrief = (portfolioData: PortfolioData, marketData: MarketData): string => {
  const riskLevel = getRiskLevel(portfolioData.riskScore);

  let brief = `Your current portfolio risk score is ${portfolioData.riskScore} out of 10, indicating ${riskLevel} risk exposure. `;

  // Analyze sector concentration
  const highRiskSectors = portfolioData.sectors.filter((s) => s.riskLevel === 'high');
  if (highRiskSectors.length > 0) {
    brief += `High-risk exposure in ${highRiskSectors.map((s) => s.name).join(' and ')}. `;
  }

  // Add market volatility context
  const avgVolatility = marketData.asianStocks.reduce((sum, stock) =>
  sum + Math.abs(stock.changePercent), 0) / marketData.asianStocks.length;

  if (avgVolatility > 2) {
    brief += `Current market volatility is elevated at ${avgVolatility.toFixed(1)}% average movement. `;
  }

  // Risk mitigation suggestions
  if (portfolioData.riskScore > 7) {
    brief += "Consider rebalancing towards defensive sectors to reduce risk exposure.";
  } else if (portfolioData.riskScore < 4) {
    brief += "Your conservative allocation may benefit from selective growth opportunities.";
  }

  return brief;
};

const generateEarningsBrief = (marketData: MarketData): string => {
  const surprises = marketData.earnings.filter((e) => Math.abs(e.surprisePercent) > 1);

  if (surprises.length === 0) {
    return "No significant earnings surprises in your Asia tech holdings today. All companies reported results within expected ranges.";
  }

  let brief = "Here are the key earnings highlights: ";

  surprises.forEach((earning, index) => {
    const direction = earning.surprisePercent > 0 ? 'beat' : 'missed';
    const performance = earning.surprisePercent > 0 ? 'beating' : 'missing';

    brief += `${earning.company} ${direction} estimates by ${Math.abs(earning.surprisePercent).toFixed(1)}%`;

    if (index < surprises.length - 1) {
      brief += ', ';
    } else {
      brief += '. ';
    }
  });

  // Add market reaction context
  const marketReaction = surprises.reduce((sum, e) => sum + e.surprisePercent, 0) / surprises.length;
  if (marketReaction > 2) {
    brief += "Overall earnings momentum is positive for the sector.";
  } else if (marketReaction < -2) {
    brief += "Earnings headwinds may pressure sector performance.";
  } else {
    brief += "Mixed earnings results suggest selective stock picking is key.";
  }

  return brief;
};

const generatePerformanceBrief = (portfolioData: PortfolioData, marketData: MarketData): string => {
  const perf = portfolioData.performance;

  let brief = `Your portfolio performance: `;
  brief += `Today ${perf.daily >= 0 ? '+' : ''}${perf.daily.toFixed(2)}%, `;
  brief += `week ${perf.weekly >= 0 ? '+' : ''}${perf.weekly.toFixed(2)}%, `;
  brief += `month ${perf.monthly >= 0 ? '+' : ''}${perf.monthly.toFixed(2)}%, `;
  brief += `year-to-date ${perf.ytd >= 0 ? '+' : ''}${perf.ytd.toFixed(2)}%. `;

  // Add context about best/worst performers
  const bestPerformer = portfolioData.positions.reduce((best, pos) =>
  pos.unrealizedGainPercent > best.unrealizedGainPercent ? pos : best);
  const worstPerformer = portfolioData.positions.reduce((worst, pos) =>
  pos.unrealizedGainPercent < worst.unrealizedGainPercent ? pos : worst);

  brief += `Best performer: ${bestPerformer.name} at ${bestPerformer.unrealizedGainPercent >= 0 ? '+' : ''}${bestPerformer.unrealizedGainPercent.toFixed(1)}%. `;
  brief += `Underperformer: ${worstPerformer.name} at ${worstPerformer.unrealizedGainPercent >= 0 ? '+' : ''}${worstPerformer.unrealizedGainPercent.toFixed(1)}%.`;

  return brief;
};

const getSentimentDescription = (sentiment: string, score: number): string => {
  if (sentiment === 'bullish') {
    return score > 70 ? 'with strong optimism' : 'with cautious optimism';
  } else if (sentiment === 'bearish') {
    return score < 30 ? 'with significant concern' : 'with mild concern';
  } else {
    return 'with mixed signals and uncertainty';
  }
};

const getRiskLevel = (riskScore: number): string => {
  if (riskScore >= 8) return 'high';
  if (riskScore >= 6) return 'moderate to high';
  if (riskScore >= 4) return 'moderate';
  if (riskScore >= 2) return 'low to moderate';
  return 'low';
};