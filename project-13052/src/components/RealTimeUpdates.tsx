import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Clock, TrendingUp, TrendingDown, AlertCircle, Bell } from 'lucide-react';

interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  timestamp: Date;
  impact: 'high' | 'medium' | 'low';
  sentiment: 'positive' | 'negative' | 'neutral';
  type: 'earnings' | 'market' | 'economic' | 'geopolitical';
}

interface MarketUpdate {
  id: string;
  type: 'price' | 'volume' | 'alert';
  symbol: string;
  message: string;
  value: number;
  change: number;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
}

export const RealTimeUpdates = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [marketUpdates, setMarketUpdates] = useState<MarketUpdate[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Generate realistic news items
  const generateNews = (): NewsItem[] => {
    const newsTemplates = [
    {
      headline: "Asian markets extend gains on strong economic data",
      summary: "Regional bourses climb as manufacturing PMI beats expectations across key economies",
      impact: 'high' as const,
      sentiment: 'positive' as const,
      type: 'market' as const
    },
    {
      headline: "Central bank signals dovish stance on monetary policy",
      summary: "Policy makers hint at potential rate cuts amid growth concerns",
      impact: 'high' as const,
      sentiment: 'positive' as const,
      type: 'economic' as const
    },
    {
      headline: "Tech earnings season delivers mixed results",
      summary: "Semiconductor stocks outperform while cloud providers face headwinds",
      impact: 'medium' as const,
      sentiment: 'neutral' as const,
      type: 'earnings' as const
    },
    {
      headline: "Currency volatility impacts export competitiveness",
      summary: "Strengthening USD creates challenges for Asian exporters",
      impact: 'medium' as const,
      sentiment: 'negative' as const,
      type: 'economic' as const
    },
    {
      headline: "AI chip demand sustains semiconductor rally",
      summary: "Leading manufacturers report continued strong demand from data centers",
      impact: 'high' as const,
      sentiment: 'positive' as const,
      type: 'market' as const
    },
    {
      headline: "Trade tensions escalate in technology sector",
      summary: "New restrictions on technology exports could impact supply chains",
      impact: 'high' as const,
      sentiment: 'negative' as const,
      type: 'geopolitical' as const
    }];


    return newsTemplates.map((template, index) => ({
      id: `news-${Date.now()}-${index}`,
      ...template,
      timestamp: new Date(Date.now() - Math.random() * 3600000) // Within last hour
    }));
  };

  // Generate market updates
  const generateMarketUpdates = (): MarketUpdate[] => {
    const symbols = ['TSM', 'BABA', 'TCEHY', '005930.KS', 'ASML', 'SONY'];
    const updates: MarketUpdate[] = [];

    symbols.forEach((symbol, index) => {
      const basePrice = 100 + Math.random() * 50;
      const change = (Math.random() - 0.5) * 10;
      const changePercent = change / basePrice * 100;

      // Price update
      updates.push({
        id: `update-${Date.now()}-${index}`,
        type: 'price',
        symbol,
        message: `${symbol} ${change >= 0 ? 'rises' : 'falls'} ${Math.abs(changePercent).toFixed(2)}%`,
        value: basePrice + change,
        change: changePercent,
        timestamp: new Date(Date.now() - Math.random() * 1800000), // Within last 30 min
        priority: Math.abs(changePercent) > 3 ? 'high' : Math.abs(changePercent) > 1 ? 'medium' : 'low'
      });

      // Volume alert
      if (Math.random() > 0.7) {
        updates.push({
          id: `volume-${Date.now()}-${index}`,
          type: 'volume',
          symbol,
          message: `${symbol} trading volume spikes above average`,
          value: Math.random() * 5000000 + 1000000,
          change: Math.random() * 200 + 50,
          timestamp: new Date(Date.now() - Math.random() * 900000), // Within last 15 min
          priority: 'medium'
        });
      }
    });

    return updates.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  // Initialize data
  useEffect(() => {
    setNews(generateNews());
    setMarketUpdates(generateMarketUpdates());
  }, []);

  // Auto-refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new updates occasionally
      if (Math.random() > 0.7) {
        const newUpdates = generateMarketUpdates().slice(0, 2);
        setMarketUpdates((prev) => [...newUpdates, ...prev].slice(0, 20));
      }

      // Add new news occasionally
      if (Math.random() > 0.8) {
        const newNews = generateNews().slice(0, 1);
        setNews((prev) => [...newNews, ...prev].slice(0, 10));
      }

      setLastUpdate(new Date());
    }, 120000); // Every 2 minutes

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setNews(generateNews());
    setMarketUpdates(generateMarketUpdates());
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':return 'bg-red-100 text-red-800';
      case 'medium':return 'bg-yellow-100 text-yellow-800';
      case 'low':return 'bg-green-100 text-green-800';
      default:return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':return <TrendingUp className="h-4 w-4 text-green-600" data-id="jkemhg6y0" data-path="src/components/RealTimeUpdates.tsx" />;
      case 'negative':return <TrendingDown className="h-4 w-4 text-red-600" data-id="ytfajill7" data-path="src/components/RealTimeUpdates.tsx" />;
      default:return <AlertCircle className="h-4 w-4 text-yellow-600" data-id="mw18ad6jg" data-path="src/components/RealTimeUpdates.tsx" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':return 'border-l-red-500';
      case 'medium':return 'border-l-yellow-500';
      case 'low':return 'border-l-green-500';
      default:return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6" data-id="m3gxiniaa" data-path="src/components/RealTimeUpdates.tsx">
      {/* Header */}
      <div className="flex items-center justify-between" data-id="aplq4yxl4" data-path="src/components/RealTimeUpdates.tsx">
        <div className="flex items-center space-x-4" data-id="pyppzbpn3" data-path="src/components/RealTimeUpdates.tsx">
          <h2 className="text-2xl font-bold" data-id="r9hkwsqw2" data-path="src/components/RealTimeUpdates.tsx">Live Market Updates</h2>
          <Badge variant="outline" className="text-green-600 border-green-200" data-id="vqmgbp1qa" data-path="src/components/RealTimeUpdates.tsx">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" data-id="lcxzxivpx" data-path="src/components/RealTimeUpdates.tsx"></div>
            Live
          </Badge>
        </div>
        <div className="flex items-center space-x-4" data-id="55sd1at4d" data-path="src/components/RealTimeUpdates.tsx">
          <span className="text-sm text-slate-500" data-id="dpribanm9" data-path="src/components/RealTimeUpdates.tsx">
            Last update: {lastUpdate.toLocaleTimeString()}
          </span>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isRefreshing}
            className="flex items-center space-x-2" data-id="wg7m4wbyi" data-path="src/components/RealTimeUpdates.tsx">

            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} data-id="h58cf9rtz" data-path="src/components/RealTimeUpdates.tsx" />
            <span data-id="imivy2eiv" data-path="src/components/RealTimeUpdates.tsx">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="e3b5vb0gu" data-path="src/components/RealTimeUpdates.tsx">
        {/* Market Updates */}
        <Card data-id="pszklhk0a" data-path="src/components/RealTimeUpdates.tsx">
          <CardHeader data-id="yw6b0r6f7" data-path="src/components/RealTimeUpdates.tsx">
            <CardTitle className="flex items-center space-x-2" data-id="ofak2bnfy" data-path="src/components/RealTimeUpdates.tsx">
              <Bell className="h-5 w-5" data-id="jjezdlsiw" data-path="src/components/RealTimeUpdates.tsx" />
              <span data-id="i2iztpp4d" data-path="src/components/RealTimeUpdates.tsx">Market Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent data-id="55z0oec9a" data-path="src/components/RealTimeUpdates.tsx">
            <ScrollArea className="h-[500px]" data-id="ywee6rjiv" data-path="src/components/RealTimeUpdates.tsx">
              <div className="space-y-3" data-id="yn8w64584" data-path="src/components/RealTimeUpdates.tsx">
                {marketUpdates.map((update, index) =>
                <div key={update.id} data-id="u121kzvug" data-path="src/components/RealTimeUpdates.tsx">
                    <div className={`border-l-4 ${getPriorityColor(update.priority)} pl-4 py-2`} data-id="jrtd0ndi6" data-path="src/components/RealTimeUpdates.tsx">
                      <div className="flex items-start justify-between" data-id="w2lbnbuvw" data-path="src/components/RealTimeUpdates.tsx">
                        <div className="flex-1" data-id="jgp57hotz" data-path="src/components/RealTimeUpdates.tsx">
                          <div className="flex items-center space-x-2 mb-1" data-id="997mwi34v" data-path="src/components/RealTimeUpdates.tsx">
                            <Badge variant="outline" className="text-xs" data-id="hqmm1jehx" data-path="src/components/RealTimeUpdates.tsx">
                              {update.symbol}
                            </Badge>
                            <Badge className={`text-xs ${getImpactColor(update.priority)}`} data-id="dqbznk2ak" data-path="src/components/RealTimeUpdates.tsx">
                              {update.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-700" data-id="bku55w81d" data-path="src/components/RealTimeUpdates.tsx">{update.message}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500" data-id="k0x34w9n7" data-path="src/components/RealTimeUpdates.tsx">
                            <span className="flex items-center space-x-1" data-id="jtyvhpey2" data-path="src/components/RealTimeUpdates.tsx">
                              <Clock className="h-3 w-3" data-id="vyegr0d79" data-path="src/components/RealTimeUpdates.tsx" />
                              <span data-id="mjt77ic9h" data-path="src/components/RealTimeUpdates.tsx">{update.timestamp.toLocaleTimeString()}</span>
                            </span>
                            {update.type === 'price' &&
                          <span className={`font-medium ${
                          update.change >= 0 ? 'text-green-600' : 'text-red-600'}`
                          } data-id="6xgxchgit" data-path="src/components/RealTimeUpdates.tsx">
                                ${update.value.toFixed(2)} ({update.change >= 0 ? '+' : ''}{update.change.toFixed(2)}%)
                              </span>
                          }
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < marketUpdates.length - 1 && <Separator className="my-2" data-id="x013nkk6n" data-path="src/components/RealTimeUpdates.tsx" />}
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* News Feed */}
        <Card data-id="lkcubydty" data-path="src/components/RealTimeUpdates.tsx">
          <CardHeader data-id="sel9am7p0" data-path="src/components/RealTimeUpdates.tsx">
            <CardTitle className="flex items-center space-x-2" data-id="gop4341ys" data-path="src/components/RealTimeUpdates.tsx">
              <TrendingUp className="h-5 w-5" data-id="y8xf9lgyf" data-path="src/components/RealTimeUpdates.tsx" />
              <span data-id="8t8q2gyl8" data-path="src/components/RealTimeUpdates.tsx">Market News</span>
            </CardTitle>
          </CardHeader>
          <CardContent data-id="n7h9q4nlr" data-path="src/components/RealTimeUpdates.tsx">
            <ScrollArea className="h-[500px]" data-id="ach1makbu" data-path="src/components/RealTimeUpdates.tsx">
              <div className="space-y-4" data-id="3ddn0p2d5" data-path="src/components/RealTimeUpdates.tsx">
                {news.map((item, index) =>
                <div key={item.id} data-id="rkvsg1w12" data-path="src/components/RealTimeUpdates.tsx">
                    <div className="space-y-2" data-id="urwcnjiyr" data-path="src/components/RealTimeUpdates.tsx">
                      <div className="flex items-start justify-between" data-id="r6gct4tio" data-path="src/components/RealTimeUpdates.tsx">
                        <div className="flex items-center space-x-2" data-id="0o7p0nupw" data-path="src/components/RealTimeUpdates.tsx">
                          {getSentimentIcon(item.sentiment)}
                          <Badge className={`text-xs ${getImpactColor(item.impact)}`} data-id="95hmxf5qr" data-path="src/components/RealTimeUpdates.tsx">
                            {item.impact} impact
                          </Badge>
                          <Badge variant="outline" className="text-xs" data-id="a3lp38ml7" data-path="src/components/RealTimeUpdates.tsx">
                            {item.type}
                          </Badge>
                        </div>
                        <span className="text-xs text-slate-500" data-id="2bv0llzjx" data-path="src/components/RealTimeUpdates.tsx">
                          {item.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <h4 className="font-semibold text-sm text-slate-800" data-id="odysxzz32" data-path="src/components/RealTimeUpdates.tsx">
                        {item.headline}
                      </h4>
                      
                      <p className="text-sm text-slate-600" data-id="e2kkn1ntl" data-path="src/components/RealTimeUpdates.tsx">
                        {item.summary}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-xs text-slate-500" data-id="v4vlfmy9h" data-path="src/components/RealTimeUpdates.tsx">
                        <Clock className="h-3 w-3" data-id="z8xa9xvem" data-path="src/components/RealTimeUpdates.tsx" />
                        <span data-id="c6vzmhh6n" data-path="src/components/RealTimeUpdates.tsx">{item.timestamp.toLocaleString()}</span>
                      </div>
                    </div>
                    {index < news.length - 1 && <Separator className="my-3" data-id="6zr4x2u76" data-path="src/components/RealTimeUpdates.tsx" />}
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card data-id="qk3rqjecu" data-path="src/components/RealTimeUpdates.tsx">
        <CardHeader data-id="leuzt0eh9" data-path="src/components/RealTimeUpdates.tsx">
          <CardTitle data-id="vypzsrtdg" data-path="src/components/RealTimeUpdates.tsx">Today's Activity Summary</CardTitle>
        </CardHeader>
        <CardContent data-id="zsi459a6i" data-path="src/components/RealTimeUpdates.tsx">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-id="0era72fil" data-path="src/components/RealTimeUpdates.tsx">
            <div className="text-center" data-id="ynug0p2v2" data-path="src/components/RealTimeUpdates.tsx">
              <p className="text-sm text-slate-600" data-id="y80i2qb6l" data-path="src/components/RealTimeUpdates.tsx">Total Alerts</p>
              <p className="text-2xl font-bold" data-id="ur881ibdi" data-path="src/components/RealTimeUpdates.tsx">{marketUpdates.length}</p>
            </div>
            <div className="text-center" data-id="4ygm2jewz" data-path="src/components/RealTimeUpdates.tsx">
              <p className="text-sm text-slate-600" data-id="ktsjvo6k2" data-path="src/components/RealTimeUpdates.tsx">High Priority</p>
              <p className="text-2xl font-bold text-red-600" data-id="t3d3gfl6l" data-path="src/components/RealTimeUpdates.tsx">
                {marketUpdates.filter((u) => u.priority === 'high').length}
              </p>
            </div>
            <div className="text-center" data-id="rtwt1o830" data-path="src/components/RealTimeUpdates.tsx">
              <p className="text-sm text-slate-600" data-id="6rjiu75xc" data-path="src/components/RealTimeUpdates.tsx">News Items</p>
              <p className="text-2xl font-bold" data-id="hs4llo49j" data-path="src/components/RealTimeUpdates.tsx">{news.length}</p>
            </div>
            <div className="text-center" data-id="yhkx782wc" data-path="src/components/RealTimeUpdates.tsx">
              <p className="text-sm text-slate-600" data-id="auqkb2gko" data-path="src/components/RealTimeUpdates.tsx">Last Update</p>
              <p className="text-sm font-medium" data-id="3orie41xu" data-path="src/components/RealTimeUpdates.tsx">{lastUpdate.toLocaleTimeString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

};