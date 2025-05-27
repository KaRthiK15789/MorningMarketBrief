import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PortfolioData } from '@/hooks/useMarketData';
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Target } from 'lucide-react';

interface PortfolioRiskAnalyzerProps {
  portfolioData: PortfolioData | null;
}

export const PortfolioRiskAnalyzer = ({ portfolioData }: PortfolioRiskAnalyzerProps) => {
  if (!portfolioData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="6f8sff7vz" data-path="src/components/PortfolioRiskAnalyzer.tsx">
        {[...Array(4)].map((_, i) =>
        <Card key={i} data-id="es0rw6nzh" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            <CardContent className="p-6" data-id="ydy5vs5m5" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <div className="animate-pulse space-y-4" data-id="fb6p9tzpf" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                <div className="h-4 bg-gray-200 rounded w-3/4" data-id="wfvnf5yiv" data-path="src/components/PortfolioRiskAnalyzer.tsx"></div>
                <div className="h-8 bg-gray-200 rounded" data-id="i533eyb15" data-path="src/components/PortfolioRiskAnalyzer.tsx"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2" data-id="r4bmte95k" data-path="src/components/PortfolioRiskAnalyzer.tsx"></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>);

  }

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 8) return 'text-red-600';
    if (riskScore >= 6) return 'text-yellow-600';
    if (riskScore >= 4) return 'text-blue-600';
    return 'text-green-600';
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':return 'destructive';
      case 'medium':return 'default';
      case 'low':return 'secondary';
      default:return 'outline';
    }
  };

  const totalValue = portfolioData.positions.reduce((sum, pos) =>
  sum + pos.currentPrice * pos.shares, 0);

  return (
    <div className="space-y-6" data-id="ogbh66bf4" data-path="src/components/PortfolioRiskAnalyzer.tsx">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="e2k52563m" data-path="src/components/PortfolioRiskAnalyzer.tsx">
        <Card data-id="9ie974l8r" data-path="src/components/PortfolioRiskAnalyzer.tsx">
          <CardContent className="p-6" data-id="gtnnd9j2p" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            <div className="flex items-center justify-between" data-id="4s2cxhlrf" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <div data-id="05dzjm1k2" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                <p className="text-sm text-slate-600" data-id="quqv1ku3t" data-path="src/components/PortfolioRiskAnalyzer.tsx">Overall Risk Score</p>
                <p className={`text-3xl font-bold ${getRiskColor(portfolioData.riskScore)}`} data-id="14muc90is" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                  {portfolioData.riskScore}/10
                </p>
              </div>
              <Shield className={`h-12 w-12 ${getRiskColor(portfolioData.riskScore)}`} data-id="oy1k3na4p" data-path="src/components/PortfolioRiskAnalyzer.tsx" />
            </div>
            <div className="mt-4" data-id="cjxyld978" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <Progress
                value={portfolioData.riskScore * 10}
                className="h-3" data-id="iggocjv90" data-path="src/components/PortfolioRiskAnalyzer.tsx" />

              <p className="text-xs text-slate-500 mt-2" data-id="w2uwqklu3" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                {portfolioData.riskScore >= 7 ? 'High Risk' :
                portfolioData.riskScore >= 5 ? 'Moderate Risk' : 'Low Risk'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card data-id="o7fmcwuht" data-path="src/components/PortfolioRiskAnalyzer.tsx">
          <CardContent className="p-6" data-id="fswq8g4ke" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            <div className="flex items-center justify-between" data-id="gxcrn0fyc" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <div data-id="li28s5juj" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                <p className="text-sm text-slate-600" data-id="pwgrhaz7g" data-path="src/components/PortfolioRiskAnalyzer.tsx">Asia Tech Exposure</p>
                <p className="text-3xl font-bold text-slate-800" data-id="fkynmwdlz" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                  {portfolioData.asiaTechAllocation}%
                </p>
              </div>
              <Target className="h-12 w-12 text-blue-500" data-id="zj9eyrwz5" data-path="src/components/PortfolioRiskAnalyzer.tsx" />
            </div>
            <div className="mt-4" data-id="hzbxt42ba" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <Progress
                value={portfolioData.asiaTechAllocation}
                className="h-3" data-id="tfhmjt4er" data-path="src/components/PortfolioRiskAnalyzer.tsx" />

              <p className="text-xs text-slate-500 mt-2" data-id="9i9cvjmw0" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                Target: 20-25% | Current: {portfolioData.asiaTechAllocation}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card data-id="0s8akzzoh" data-path="src/components/PortfolioRiskAnalyzer.tsx">
          <CardContent className="p-6" data-id="57m0iipjs" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            <div className="flex items-center justify-between" data-id="wb2e8out6" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <div data-id="1ejqufop6" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                <p className="text-sm text-slate-600" data-id="wwm0s9gc1" data-path="src/components/PortfolioRiskAnalyzer.tsx">Portfolio Value</p>
                <p className="text-3xl font-bold text-slate-800" data-id="gl6zni2zm" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                  ${(totalValue / 1000000).toFixed(1)}M
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-500" data-id="t4kyt2q3g" data-path="src/components/PortfolioRiskAnalyzer.tsx" />
            </div>
            <div className="mt-4" data-id="8u28tntc7" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <p className={`text-sm ${
              portfolioData.performance.daily >= 0 ? 'text-green-600' : 'text-red-600'}`
              } data-id="ilvqoddwb" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                {portfolioData.performance.daily >= 0 ? '+' : ''}
                {portfolioData.performance.daily.toFixed(2)}% today
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts */}
      {portfolioData.riskScore > 7 &&
      <Alert data-id="qzw11js99" data-path="src/components/PortfolioRiskAnalyzer.tsx">
          <AlertTriangle className="h-4 w-4" data-id="ofq5mzxd4" data-path="src/components/PortfolioRiskAnalyzer.tsx" />
          <AlertDescription data-id="ru02mfye9" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            High risk exposure detected. Consider rebalancing towards defensive sectors or 
            implementing hedging strategies to reduce portfolio volatility.
          </AlertDescription>
        </Alert>
      }

      {portfolioData.asiaTechAllocation > 30 &&
      <Alert data-id="1kiu3k8t7" data-path="src/components/PortfolioRiskAnalyzer.tsx">
          <AlertTriangle className="h-4 w-4" data-id="2zozshi74" data-path="src/components/PortfolioRiskAnalyzer.tsx" />
          <AlertDescription data-id="cdoh48u30" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            Asia tech allocation ({portfolioData.asiaTechAllocation}%) exceeds recommended maximum of 30%. 
            Consider diversifying into other regions or sectors.
          </AlertDescription>
        </Alert>
      }

      {/* Sector Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="t5b6wq7fo" data-path="src/components/PortfolioRiskAnalyzer.tsx">
        <Card data-id="5wyamkf22" data-path="src/components/PortfolioRiskAnalyzer.tsx">
          <CardHeader data-id="phspflbhr" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            <CardTitle className="flex items-center space-x-2" data-id="2ml465ako" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <Target className="h-5 w-5" data-id="0moq38c5m" data-path="src/components/PortfolioRiskAnalyzer.tsx" />
              <span data-id="rvemo5c3i" data-path="src/components/PortfolioRiskAnalyzer.tsx">Sector Allocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent data-id="lb58fb2tg" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            <div className="space-y-4" data-id="mctp73xym" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              {portfolioData.sectors.map((sector, index) =>
              <div key={index} className="space-y-2" data-id="rdd23b405" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                  <div className="flex items-center justify-between" data-id="alr18for1" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                    <div className="flex items-center space-x-2" data-id="gposi620u" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                      <span className="text-sm font-medium" data-id="gi9gwou9j" data-path="src/components/PortfolioRiskAnalyzer.tsx">{sector.name}</span>
                      <Badge variant={getRiskBadgeVariant(sector.riskLevel)} data-id="7co2imid1" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                        {sector.riskLevel}
                      </Badge>
                    </div>
                    <span className="text-sm text-slate-600" data-id="6melkj0kp" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                      {sector.allocation.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={sector.allocation} className="h-2" data-id="1i4v57pvs" data-path="src/components/PortfolioRiskAnalyzer.tsx" />
                  <div className="flex items-center justify-between text-xs text-slate-500" data-id="7hut9oyvi" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                    <span data-id="jhz68owjk" data-path="src/components/PortfolioRiskAnalyzer.tsx">Performance: {sector.performance >= 0 ? '+' : ''}{sector.performance.toFixed(2)}%</span>
                    <span className={sector.performance >= 0 ? 'text-green-600' : 'text-red-600'} data-id="wt4l5l5l6" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                      {sector.performance >= 0 ?
                    <TrendingUp className="h-3 w-3 inline" data-id="rkc9nwdgr" data-path="src/components/PortfolioRiskAnalyzer.tsx" /> :
                    <TrendingDown className="h-3 w-3 inline" data-id="kemysdmsa" data-path="src/components/PortfolioRiskAnalyzer.tsx" />
                    }
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Positions */}
        <Card data-id="tyflvkmxp" data-path="src/components/PortfolioRiskAnalyzer.tsx">
          <CardHeader data-id="bwa2n3lj3" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            <CardTitle className="flex items-center space-x-2" data-id="ktz8a5hlb" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <TrendingUp className="h-5 w-5" data-id="l1t76hut3" data-path="src/components/PortfolioRiskAnalyzer.tsx" />
              <span data-id="uqi6dphij" data-path="src/components/PortfolioRiskAnalyzer.tsx">Top Positions</span>
            </CardTitle>
          </CardHeader>
          <CardContent data-id="yj8v1rgr5" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            <div className="space-y-4" data-id="1h63l4iua" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              {portfolioData.positions.
              sort((a, b) => b.weight - a.weight).
              slice(0, 5).
              map((position, index) =>
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg" data-id="9vsqtpvjw" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                  <div data-id="odfujzzzw" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                    <p className="font-medium text-sm" data-id="abj3eiw1a" data-path="src/components/PortfolioRiskAnalyzer.tsx">{position.symbol}</p>
                    <p className="text-xs text-slate-600" data-id="4yd6a0e5v" data-path="src/components/PortfolioRiskAnalyzer.tsx">{position.name}</p>
                    <p className="text-xs text-slate-500" data-id="ji58bklmo" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                      {position.shares.toLocaleString()} shares @ ${position.avgCost}
                    </p>
                  </div>
                  <div className="text-right" data-id="efeozu3mt" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                    <p className="text-sm font-medium" data-id="62f1mfnn3" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                      ${(position.currentPrice * position.shares).toLocaleString()}
                    </p>
                    <p className={`text-xs ${
                  position.unrealizedGainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`
                  } data-id="5chi1of8c" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                      {position.unrealizedGainPercent >= 0 ? '+' : ''}
                      {position.unrealizedGainPercent.toFixed(2)}%
                    </p>
                    <p className="text-xs text-slate-500" data-id="xes0pl6b6" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                      {position.weight.toFixed(1)}% weight
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card data-id="iid03fpxe" data-path="src/components/PortfolioRiskAnalyzer.tsx">
        <CardHeader data-id="t7864ucbi" data-path="src/components/PortfolioRiskAnalyzer.tsx">
          <CardTitle data-id="2l8ydm1bx" data-path="src/components/PortfolioRiskAnalyzer.tsx">Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent data-id="lq2emifi4" data-path="src/components/PortfolioRiskAnalyzer.tsx">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-id="wn9edyg0t" data-path="src/components/PortfolioRiskAnalyzer.tsx">
            <div className="text-center" data-id="rxvfus1zm" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <p className="text-sm text-slate-600" data-id="6edvd2nha" data-path="src/components/PortfolioRiskAnalyzer.tsx">Daily</p>
              <p className={`text-2xl font-bold ${
              portfolioData.performance.daily >= 0 ? 'text-green-600' : 'text-red-600'}`
              } data-id="zkegm95fj" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                {portfolioData.performance.daily >= 0 ? '+' : ''}
                {portfolioData.performance.daily.toFixed(2)}%
              </p>
            </div>
            <div className="text-center" data-id="dpmwasu0o" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <p className="text-sm text-slate-600" data-id="j03qlejxz" data-path="src/components/PortfolioRiskAnalyzer.tsx">Weekly</p>
              <p className={`text-2xl font-bold ${
              portfolioData.performance.weekly >= 0 ? 'text-green-600' : 'text-red-600'}`
              } data-id="g3bkq67a4" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                {portfolioData.performance.weekly >= 0 ? '+' : ''}
                {portfolioData.performance.weekly.toFixed(2)}%
              </p>
            </div>
            <div className="text-center" data-id="ncg6knwo3" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <p className="text-sm text-slate-600" data-id="amnxodijc" data-path="src/components/PortfolioRiskAnalyzer.tsx">Monthly</p>
              <p className={`text-2xl font-bold ${
              portfolioData.performance.monthly >= 0 ? 'text-green-600' : 'text-red-600'}`
              } data-id="aodis6hsw" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                {portfolioData.performance.monthly >= 0 ? '+' : ''}
                {portfolioData.performance.monthly.toFixed(2)}%
              </p>
            </div>
            <div className="text-center" data-id="xfm353sas" data-path="src/components/PortfolioRiskAnalyzer.tsx">
              <p className="text-sm text-slate-600" data-id="nyyxfrcgj" data-path="src/components/PortfolioRiskAnalyzer.tsx">YTD</p>
              <p className={`text-2xl font-bold ${
              portfolioData.performance.ytd >= 0 ? 'text-green-600' : 'text-red-600'}`
              } data-id="k275tdag5" data-path="src/components/PortfolioRiskAnalyzer.tsx">
                {portfolioData.performance.ytd >= 0 ? '+' : ''}
                {portfolioData.performance.ytd.toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

};