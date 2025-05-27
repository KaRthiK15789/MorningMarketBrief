import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { VoiceInterface } from '@/components/VoiceInterface';
import { PortfolioRiskAnalyzer } from '@/components/PortfolioRiskAnalyzer';
import { EarningsHighlights } from '@/components/EarningsHighlights';
import { MarketOverview } from '@/components/MarketOverview';
import { RealTimeUpdates } from '@/components/RealTimeUpdates';
import { useMarketData } from '@/hooks/useMarketData';
import { Mic, MicOff, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const HomePage = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const { marketData, portfolioData, isLoading } = useMarketData();

  // Update timestamp every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center" data-id="wak0es6yw" data-path="src/pages/HomePage.tsx">
        <div className="text-center space-y-4" data-id="8uuvyf3ux" data-path="src/pages/HomePage.tsx">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" data-id="xjj8buirw" data-path="src/pages/HomePage.tsx"></div>
          <p className="text-slate-600" data-id="ssriouskq" data-path="src/pages/HomePage.tsx">Loading market data...</p>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" data-id="zrx3cyrfg" data-path="src/pages/HomePage.tsx">
      {/* Header */}
      <header className="bg-white shadow-sm border-b" data-id="nbn0fxwxl" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-6 py-4" data-id="whjhwdv94" data-path="src/pages/HomePage.tsx">
          <div className="flex justify-between items-center" data-id="654f3qj3f" data-path="src/pages/HomePage.tsx">
            <div className="flex items-center space-x-4" data-id="3fqm8mlhs" data-path="src/pages/HomePage.tsx">
              <h1 className="text-2xl font-bold text-slate-800" data-id="11xwaun2e" data-path="src/pages/HomePage.tsx">Portfolio Intelligence</h1>
              <Badge variant="outline" className="text-green-600 border-green-200" data-id="pk1ary0dk" data-path="src/pages/HomePage.tsx">
                Live
              </Badge>
            </div>
            <div className="flex items-center space-x-4" data-id="sde1ho8o1" data-path="src/pages/HomePage.tsx">
              <span className="text-sm text-slate-500" data-id="br07k1zw1" data-path="src/pages/HomePage.tsx">
                Last update: {lastUpdate.toLocaleTimeString()}
              </span>
              <Button
                onClick={toggleVoice}
                variant={isVoiceActive ? "default" : "outline"}
                size="sm"
                className="flex items-center space-x-2" data-id="zoxtihe6q" data-path="src/pages/HomePage.tsx">

                {isVoiceActive ? <Mic className="h-4 w-4" data-id="6x3wbea8o" data-path="src/pages/HomePage.tsx" /> : <MicOff className="h-4 w-4" data-id="lajptlcjk" data-path="src/pages/HomePage.tsx" />}
                <span data-id="enylwamrv" data-path="src/pages/HomePage.tsx">{isVoiceActive ? "Voice Active" : "Voice Off"}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Voice Interface */}
      {isVoiceActive &&
      <div className="bg-blue-50 border-b border-blue-200" data-id="hoczosmns" data-path="src/pages/HomePage.tsx">
          <div className="container mx-auto px-6 py-3" data-id="k3c31hr94" data-path="src/pages/HomePage.tsx">
            <VoiceInterface
            portfolioData={portfolioData}
            marketData={marketData}
            isActive={isVoiceActive} data-id="i6nrmhbot" data-path="src/pages/HomePage.tsx" />

          </div>
        </div>
      }

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8" data-id="wc87rny7c" data-path="src/pages/HomePage.tsx">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-id="4489yteol" data-path="src/pages/HomePage.tsx">
          <Card data-id="cdceb51wq" data-path="src/pages/HomePage.tsx">
            <CardContent className="p-4" data-id="0kndg0tfw" data-path="src/pages/HomePage.tsx">
              <div className="flex items-center justify-between" data-id="ykb2yx0f6" data-path="src/pages/HomePage.tsx">
                <div data-id="1smtvifa3" data-path="src/pages/HomePage.tsx">
                  <p className="text-sm text-slate-600" data-id="yta9z2svt" data-path="src/pages/HomePage.tsx">Asia Tech Allocation</p>
                  <p className="text-2xl font-bold text-slate-800" data-id="yisxup8vn" data-path="src/pages/HomePage.tsx">
                    {portfolioData?.asiaTechAllocation || 22}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" data-id="48svdl7j4" data-path="src/pages/HomePage.tsx" />
              </div>
              <div className="mt-2" data-id="vftyo7qmy" data-path="src/pages/HomePage.tsx">
                <Progress value={portfolioData?.asiaTechAllocation || 22} className="h-2" data-id="r6cr379ln" data-path="src/pages/HomePage.tsx" />
                <p className="text-xs text-slate-500 mt-1" data-id="8on3mhiqi" data-path="src/pages/HomePage.tsx">+4% from yesterday</p>
              </div>
            </CardContent>
          </Card>

          <Card data-id="5dvnyxgln" data-path="src/pages/HomePage.tsx">
            <CardContent className="p-4" data-id="nafvbkd9z" data-path="src/pages/HomePage.tsx">
              <div className="flex items-center justify-between" data-id="bpt9jeami" data-path="src/pages/HomePage.tsx">
                <div data-id="7qam53lg2" data-path="src/pages/HomePage.tsx">
                  <p className="text-sm text-slate-600" data-id="ydugwpk4m" data-path="src/pages/HomePage.tsx">Total AUM</p>
                  <p className="text-2xl font-bold text-slate-800" data-id="0wd9v8aai" data-path="src/pages/HomePage.tsx">
                    ${marketData?.totalAUM || '2.4B'}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" data-id="zrd8lb2wh" data-path="src/pages/HomePage.tsx" />
              </div>
              <p className="text-xs text-green-600 mt-2" data-id="77zpe9p7l" data-path="src/pages/HomePage.tsx">+1.2% today</p>
            </CardContent>
          </Card>

          <Card data-id="1590g8c1h" data-path="src/pages/HomePage.tsx">
            <CardContent className="p-4" data-id="leagvt3ap" data-path="src/pages/HomePage.tsx">
              <div className="flex items-center justify-between" data-id="hknwd8ri0" data-path="src/pages/HomePage.tsx">
                <div data-id="7d7w1hqin" data-path="src/pages/HomePage.tsx">
                  <p className="text-sm text-slate-600" data-id="dag5s2dq0" data-path="src/pages/HomePage.tsx">Risk Score</p>
                  <p className="text-2xl font-bold text-slate-800" data-id="gl6p5bz46" data-path="src/pages/HomePage.tsx">
                    {portfolioData?.riskScore || 6.2}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" data-id="3rxucgskz" data-path="src/pages/HomePage.tsx" />
              </div>
              <p className="text-xs text-yellow-600 mt-2" data-id="xxgzdt9xk" data-path="src/pages/HomePage.tsx">Moderate Risk</p>
            </CardContent>
          </Card>

          <Card data-id="pm5aegew3" data-path="src/pages/HomePage.tsx">
            <CardContent className="p-4" data-id="xzhx5wxzq" data-path="src/pages/HomePage.tsx">
              <div className="flex items-center justify-between" data-id="fn2nhqe8x" data-path="src/pages/HomePage.tsx">
                <div data-id="s0bnd5fti" data-path="src/pages/HomePage.tsx">
                  <p className="text-sm text-slate-600" data-id="cq7pdgo1c" data-path="src/pages/HomePage.tsx">Active Positions</p>
                  <p className="text-2xl font-bold text-slate-800" data-id="vk0unmkd4" data-path="src/pages/HomePage.tsx">
                    {marketData?.activePositions || 127}
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-slate-500" data-id="ffmbc034d" data-path="src/pages/HomePage.tsx" />
              </div>
              <p className="text-xs text-slate-500 mt-2" data-id="t1xnbp3q6" data-path="src/pages/HomePage.tsx">Across 15 sectors</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6" data-id="tx4fr6m3o" data-path="src/pages/HomePage.tsx">
          <TabsList className="grid w-full grid-cols-4" data-id="tu1cifzki" data-path="src/pages/HomePage.tsx">
            <TabsTrigger value="overview" data-id="98mj25a19" data-path="src/pages/HomePage.tsx">Market Overview</TabsTrigger>
            <TabsTrigger value="risk" data-id="6qc1kmed4" data-path="src/pages/HomePage.tsx">Risk Analysis</TabsTrigger>
            <TabsTrigger value="earnings" data-id="0ioc6nyxh" data-path="src/pages/HomePage.tsx">Earnings</TabsTrigger>
            <TabsTrigger value="updates" data-id="5kn3oy1yb" data-path="src/pages/HomePage.tsx">Live Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6" data-id="kmanksv6p" data-path="src/pages/HomePage.tsx">
            <MarketOverview marketData={marketData} data-id="6wwgxho2l" data-path="src/pages/HomePage.tsx" />
          </TabsContent>

          <TabsContent value="risk" className="space-y-6" data-id="glzs9s5m6" data-path="src/pages/HomePage.tsx">
            <PortfolioRiskAnalyzer portfolioData={portfolioData} data-id="wwcbiu2a3" data-path="src/pages/HomePage.tsx" />
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6" data-id="gwumyes9n" data-path="src/pages/HomePage.tsx">
            <EarningsHighlights marketData={marketData} data-id="518i22h5t" data-path="src/pages/HomePage.tsx" />
          </TabsContent>

          <TabsContent value="updates" className="space-y-6" data-id="cw60vx6nd" data-path="src/pages/HomePage.tsx">
            <RealTimeUpdates data-id="20nqwfqfz" data-path="src/pages/HomePage.tsx" />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12" data-id="hrtb9o96a" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-6 py-6" data-id="rumybqr0g" data-path="src/pages/HomePage.tsx">
          <div className="text-center text-slate-500" data-id="76iustghj" data-path="src/pages/HomePage.tsx">
            <p data-id="fibmmyt46" data-path="src/pages/HomePage.tsx">© {new Date().getFullYear()} Portfolio Intelligence. Real-time market analysis powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default HomePage;