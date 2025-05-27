import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketData } from '@/hooks/useMarketData';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Target, AlertCircle } from 'lucide-react';

interface EarningsHighlightsProps {
  marketData: MarketData | null;
}

export const EarningsHighlights = ({ marketData }: EarningsHighlightsProps) => {
  if (!marketData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="bkhow1g7m" data-path="src/components/EarningsHighlights.tsx">
        {[...Array(4)].map((_, i) =>
        <Card key={i} data-id="8h8ajf1oq" data-path="src/components/EarningsHighlights.tsx">
            <CardContent className="p-6" data-id="nvt7d75py" data-path="src/components/EarningsHighlights.tsx">
              <div className="animate-pulse space-y-4" data-id="pllt5y4wz" data-path="src/components/EarningsHighlights.tsx">
                <div className="h-4 bg-gray-200 rounded w-3/4" data-id="1bhun6e4b" data-path="src/components/EarningsHighlights.tsx"></div>
                <div className="h-8 bg-gray-200 rounded" data-id="tuhevxt5k" data-path="src/components/EarningsHighlights.tsx"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2" data-id="fxqql98nf" data-path="src/components/EarningsHighlights.tsx"></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>);

  }

  const earnings = marketData.earnings;
  const surprises = earnings.filter((e) => Math.abs(e.surprisePercent) > 1);
  const beats = earnings.filter((e) => e.surprisePercent > 1);
  const misses = earnings.filter((e) => e.surprisePercent < -1);
  const inLine = earnings.filter((e) => Math.abs(e.surprisePercent) <= 1);

  const getBadgeVariant = (surprisePercent: number) => {
    if (surprisePercent > 2) return 'default';
    if (surprisePercent > 0) return 'secondary';
    if (surprisePercent > -2) return 'outline';
    return 'destructive';
  };

  const getImpactIcon = (surprisePercent: number) => {
    if (Math.abs(surprisePercent) > 5) return <AlertCircle className="h-4 w-4" data-id="o3qy81znl" data-path="src/components/EarningsHighlights.tsx" />;
    if (surprisePercent > 0) return <TrendingUp className="h-4 w-4" data-id="bib446ivr" data-path="src/components/EarningsHighlights.tsx" />;
    return <TrendingDown className="h-4 w-4" data-id="ht6aiygrp" data-path="src/components/EarningsHighlights.tsx" />;
  };

  return (
    <div className="space-y-6" data-id="88o4guumt" data-path="src/components/EarningsHighlights.tsx">
      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="60rq58xq4" data-path="src/components/EarningsHighlights.tsx">
        <Card data-id="m9ba7or2t" data-path="src/components/EarningsHighlights.tsx">
          <CardContent className="p-4" data-id="zdc6jbj7d" data-path="src/components/EarningsHighlights.tsx">
            <div className="flex items-center justify-between" data-id="1fjr8k3zf" data-path="src/components/EarningsHighlights.tsx">
              <div data-id="fcd5bw50b" data-path="src/components/EarningsHighlights.tsx">
                <p className="text-sm text-slate-600" data-id="lkh0e29hg" data-path="src/components/EarningsHighlights.tsx">Total Reports</p>
                <p className="text-2xl font-bold" data-id="42tq79jnu" data-path="src/components/EarningsHighlights.tsx">{earnings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" data-id="cnnwtx28a" data-path="src/components/EarningsHighlights.tsx" />
            </div>
          </CardContent>
        </Card>

        <Card data-id="c3306siml" data-path="src/components/EarningsHighlights.tsx">
          <CardContent className="p-4" data-id="o50p75mur" data-path="src/components/EarningsHighlights.tsx">
            <div className="flex items-center justify-between" data-id="1rg3xkr85" data-path="src/components/EarningsHighlights.tsx">
              <div data-id="v76pott87" data-path="src/components/EarningsHighlights.tsx">
                <p className="text-sm text-slate-600" data-id="feywrg72l" data-path="src/components/EarningsHighlights.tsx">Earnings Beats</p>
                <p className="text-2xl font-bold text-green-600" data-id="b4e8o33z5" data-path="src/components/EarningsHighlights.tsx">{beats.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" data-id="46zljy8fm" data-path="src/components/EarningsHighlights.tsx" />
            </div>
          </CardContent>
        </Card>

        <Card data-id="hae87cm2m" data-path="src/components/EarningsHighlights.tsx">
          <CardContent className="p-4" data-id="kbrq1j8rn" data-path="src/components/EarningsHighlights.tsx">
            <div className="flex items-center justify-between" data-id="arhax6sn9" data-path="src/components/EarningsHighlights.tsx">
              <div data-id="c4eg0ag3r" data-path="src/components/EarningsHighlights.tsx">
                <p className="text-sm text-slate-600" data-id="z6phk3sd0" data-path="src/components/EarningsHighlights.tsx">Earnings Misses</p>
                <p className="text-2xl font-bold text-red-600" data-id="grgoo5kk6" data-path="src/components/EarningsHighlights.tsx">{misses.length}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" data-id="55zl73syk" data-path="src/components/EarningsHighlights.tsx" />
            </div>
          </CardContent>
        </Card>

        <Card data-id="1kwf1iwqb" data-path="src/components/EarningsHighlights.tsx">
          <CardContent className="p-4" data-id="cvqmco04b" data-path="src/components/EarningsHighlights.tsx">
            <div className="flex items-center justify-between" data-id="8mmc4ms0a" data-path="src/components/EarningsHighlights.tsx">
              <div data-id="v4zpee7gh" data-path="src/components/EarningsHighlights.tsx">
                <p className="text-sm text-slate-600" data-id="xh9s0wc3n" data-path="src/components/EarningsHighlights.tsx">In-Line</p>
                <p className="text-2xl font-bold text-slate-600" data-id="d85twkuis" data-path="src/components/EarningsHighlights.tsx">{inLine.length}</p>
              </div>
              <Target className="h-8 w-8 text-slate-500" data-id="gqphcmhxe" data-path="src/components/EarningsHighlights.tsx" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Earnings */}
      <Tabs defaultValue="all" className="space-y-4" data-id="hnh3rag6h" data-path="src/components/EarningsHighlights.tsx">
        <TabsList data-id="wqqzsehkg" data-path="src/components/EarningsHighlights.tsx">
          <TabsTrigger value="all" data-id="jhp3wz2kg" data-path="src/components/EarningsHighlights.tsx">All Reports</TabsTrigger>
          <TabsTrigger value="surprises" data-id="63jydw2qx" data-path="src/components/EarningsHighlights.tsx">Surprises</TabsTrigger>
          <TabsTrigger value="beats" data-id="iyz8cygrl" data-path="src/components/EarningsHighlights.tsx">Beats</TabsTrigger>
          <TabsTrigger value="misses" data-id="m9yjac9q3" data-path="src/components/EarningsHighlights.tsx">Misses</TabsTrigger>
        </TabsList>

        <TabsContent value="all" data-id="nt23xbsle" data-path="src/components/EarningsHighlights.tsx">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-id="af8adrr6h" data-path="src/components/EarningsHighlights.tsx">
            {earnings.map((earning, index) =>
            <Card key={index} className="hover:shadow-md transition-shadow" data-id="th2p8r6gf" data-path="src/components/EarningsHighlights.tsx">
                <CardContent className="p-4" data-id="bh9m1ihlr" data-path="src/components/EarningsHighlights.tsx">
                  <div className="flex items-start justify-between mb-3" data-id="k8fbdesvw" data-path="src/components/EarningsHighlights.tsx">
                    <div data-id="8w4v4kah9" data-path="src/components/EarningsHighlights.tsx">
                      <h3 className="font-semibold text-lg" data-id="gnbklm6ck" data-path="src/components/EarningsHighlights.tsx">{earning.symbol}</h3>
                      <p className="text-sm text-slate-600" data-id="zn3ragzj8" data-path="src/components/EarningsHighlights.tsx">{earning.company}</p>
                      <p className="text-xs text-slate-500" data-id="yh81fhamn" data-path="src/components/EarningsHighlights.tsx">{earning.date}</p>
                    </div>
                    <div className="flex items-center space-x-2" data-id="sh9umgfy3" data-path="src/components/EarningsHighlights.tsx">
                      {getImpactIcon(earning.surprisePercent)}
                      <Badge variant={getBadgeVariant(earning.surprisePercent)} data-id="jtczh9mop" data-path="src/components/EarningsHighlights.tsx">
                        {earning.surprisePercent > 0 ? '+' : ''}
                        {earning.surprisePercent.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center" data-id="z2lvje784" data-path="src/components/EarningsHighlights.tsx">
                    <div data-id="7el4btcxm" data-path="src/components/EarningsHighlights.tsx">
                      <p className="text-xs text-slate-500" data-id="azuhx9pm1" data-path="src/components/EarningsHighlights.tsx">Expected</p>
                      <p className="font-medium" data-id="w05o26usj" data-path="src/components/EarningsHighlights.tsx">${earning.expected.toFixed(2)}</p>
                    </div>
                    <div data-id="3ih1et2fv" data-path="src/components/EarningsHighlights.tsx">
                      <p className="text-xs text-slate-500" data-id="ynvfv1bbn" data-path="src/components/EarningsHighlights.tsx">Actual</p>
                      <p className={`font-medium ${
                    earning.actual > earning.expected ? 'text-green-600' :
                    earning.actual < earning.expected ? 'text-red-600' : 'text-slate-600'}`
                    } data-id="d81dkr84d" data-path="src/components/EarningsHighlights.tsx">
                        ${earning.actual.toFixed(2)}
                      </p>
                    </div>
                    <div data-id="nmoe25l3r" data-path="src/components/EarningsHighlights.tsx">
                      <p className="text-xs text-slate-500" data-id="4fppn33s1" data-path="src/components/EarningsHighlights.tsx">Surprise</p>
                      <p className={`font-medium ${
                    earning.surprise > 0 ? 'text-green-600' :
                    earning.surprise < 0 ? 'text-red-600' : 'text-slate-600'}`
                    } data-id="jf7q3yhm0" data-path="src/components/EarningsHighlights.tsx">
                        ${earning.surprise >= 0 ? '+' : ''}
                        {earning.surprise.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {Math.abs(earning.surprisePercent) > 3 &&
                <div className="mt-3 p-2 bg-slate-50 rounded text-xs text-slate-600" data-id="igxoru7ty" data-path="src/components/EarningsHighlights.tsx">
                      <strong data-id="yjqflknek" data-path="src/components/EarningsHighlights.tsx">Market Impact:</strong> {
                  earning.surprisePercent > 3 ?
                  'Significant positive surprise likely to drive stock price higher' :
                  'Major disappointment may pressure stock price'
                  }
                    </div>
                }
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="surprises" data-id="2h7xp34df" data-path="src/components/EarningsHighlights.tsx">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-id="iu2r1fqzr" data-path="src/components/EarningsHighlights.tsx">
            {surprises.length > 0 ? surprises.map((earning, index) =>
            <Card key={index} className="hover:shadow-md transition-shadow" data-id="cvp55w2hq" data-path="src/components/EarningsHighlights.tsx">
                <CardContent className="p-4" data-id="2oqydpnns" data-path="src/components/EarningsHighlights.tsx">
                  <div className="flex items-start justify-between mb-3" data-id="7z4reajg3" data-path="src/components/EarningsHighlights.tsx">
                    <div data-id="8vvedrhie" data-path="src/components/EarningsHighlights.tsx">
                      <h3 className="font-semibold text-lg" data-id="k6wv1zv36" data-path="src/components/EarningsHighlights.tsx">{earning.symbol}</h3>
                      <p className="text-sm text-slate-600" data-id="rhkokv6dx" data-path="src/components/EarningsHighlights.tsx">{earning.company}</p>
                    </div>
                    <Badge variant={getBadgeVariant(earning.surprisePercent)} className="text-lg px-3 py-1" data-id="07226cj95" data-path="src/components/EarningsHighlights.tsx">
                      {earning.surprisePercent > 0 ? '+' : ''}
                      {earning.surprisePercent.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="text-center" data-id="k3083jzy4" data-path="src/components/EarningsHighlights.tsx">
                    <p className="text-sm text-slate-600" data-id="zed0glgt9" data-path="src/components/EarningsHighlights.tsx">
                      {earning.surprisePercent > 0 ? 'Beat by' : 'Missed by'} ${Math.abs(earning.surprise).toFixed(2)}
                    </p>
                    <p className="text-lg font-bold" data-id="iulj46mw6" data-path="src/components/EarningsHighlights.tsx">
                      ${earning.actual.toFixed(2)} vs ${earning.expected.toFixed(2)} expected
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) :
            <div className="col-span-2 text-center py-12" data-id="8xgp57y4z" data-path="src/components/EarningsHighlights.tsx">
                <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" data-id="ott94aa1a" data-path="src/components/EarningsHighlights.tsx" />
                <p className="text-slate-600" data-id="ix0iv5y8d" data-path="src/components/EarningsHighlights.tsx">No significant earnings surprises</p>
                <p className="text-sm text-slate-500" data-id="xc284vpd6" data-path="src/components/EarningsHighlights.tsx">All companies reported within expected ranges</p>
              </div>
            }
          </div>
        </TabsContent>

        <TabsContent value="beats" data-id="ggvf8qxpi" data-path="src/components/EarningsHighlights.tsx">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-id="jeqpzh9rp" data-path="src/components/EarningsHighlights.tsx">
            {beats.length > 0 ? beats.map((earning, index) =>
            <Card key={index} className="border-green-200 hover:shadow-md transition-shadow" data-id="rnsru1pzd" data-path="src/components/EarningsHighlights.tsx">
                <CardContent className="p-4" data-id="ero5zn32o" data-path="src/components/EarningsHighlights.tsx">
                  <div className="flex items-start justify-between mb-3" data-id="nz5e3h75w" data-path="src/components/EarningsHighlights.tsx">
                    <div data-id="r9kx08xx6" data-path="src/components/EarningsHighlights.tsx">
                      <h3 className="font-semibold text-lg" data-id="0xq9zm52c" data-path="src/components/EarningsHighlights.tsx">{earning.symbol}</h3>
                      <p className="text-sm text-slate-600" data-id="f9c6imy8y" data-path="src/components/EarningsHighlights.tsx">{earning.company}</p>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-800" data-id="ya13jctt1" data-path="src/components/EarningsHighlights.tsx">
                      +{earning.surprisePercent.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="text-center" data-id="wk9v8nzi7" data-path="src/components/EarningsHighlights.tsx">
                    <p className="text-sm text-green-600" data-id="1z8qrasly" data-path="src/components/EarningsHighlights.tsx">Beat by ${earning.surprise.toFixed(2)}</p>
                    <p className="text-lg font-bold" data-id="7b0lmnyjl" data-path="src/components/EarningsHighlights.tsx">
                      ${earning.actual.toFixed(2)} vs ${earning.expected.toFixed(2)} expected
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) :
            <div className="col-span-2 text-center py-12" data-id="ez70tp99m" data-path="src/components/EarningsHighlights.tsx">
                <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" data-id="kfky6dxfv" data-path="src/components/EarningsHighlights.tsx" />
                <p className="text-slate-600" data-id="ntj3qp0a5" data-path="src/components/EarningsHighlights.tsx">No earnings beats this period</p>
              </div>
            }
          </div>
        </TabsContent>

        <TabsContent value="misses" data-id="01uyls99h" data-path="src/components/EarningsHighlights.tsx">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-id="0coxgd03w" data-path="src/components/EarningsHighlights.tsx">
            {misses.length > 0 ? misses.map((earning, index) =>
            <Card key={index} className="border-red-200 hover:shadow-md transition-shadow" data-id="ti6nsh0b8" data-path="src/components/EarningsHighlights.tsx">
                <CardContent className="p-4" data-id="5hm71w75x" data-path="src/components/EarningsHighlights.tsx">
                  <div className="flex items-start justify-between mb-3" data-id="528trcaks" data-path="src/components/EarningsHighlights.tsx">
                    <div data-id="0bfnippbv" data-path="src/components/EarningsHighlights.tsx">
                      <h3 className="font-semibold text-lg" data-id="63eix07tv" data-path="src/components/EarningsHighlights.tsx">{earning.symbol}</h3>
                      <p className="text-sm text-slate-600" data-id="op5a72eux" data-path="src/components/EarningsHighlights.tsx">{earning.company}</p>
                    </div>
                    <Badge variant="destructive" data-id="x1cwekpuf" data-path="src/components/EarningsHighlights.tsx">
                      {earning.surprisePercent.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="text-center" data-id="vnw4qpagx" data-path="src/components/EarningsHighlights.tsx">
                    <p className="text-sm text-red-600" data-id="jpb64i5fw" data-path="src/components/EarningsHighlights.tsx">Missed by ${Math.abs(earning.surprise).toFixed(2)}</p>
                    <p className="text-lg font-bold" data-id="7oog3n6p6" data-path="src/components/EarningsHighlights.tsx">
                      ${earning.actual.toFixed(2)} vs ${earning.expected.toFixed(2)} expected
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) :
            <div className="col-span-2 text-center py-12" data-id="3bi97zyx4" data-path="src/components/EarningsHighlights.tsx">
                <TrendingDown className="h-12 w-12 text-slate-400 mx-auto mb-4" data-id="4qvldl4x9" data-path="src/components/EarningsHighlights.tsx" />
                <p className="text-slate-600" data-id="fiadqgb8s" data-path="src/components/EarningsHighlights.tsx">No earnings misses this period</p>
              </div>
            }
          </div>
        </TabsContent>
      </Tabs>

      {/* Market Impact Analysis */}
      <Card data-id="m7i8tqqyp" data-path="src/components/EarningsHighlights.tsx">
        <CardHeader data-id="b8n20rwdv" data-path="src/components/EarningsHighlights.tsx">
          <CardTitle className="flex items-center space-x-2" data-id="g3mvlf65x" data-path="src/components/EarningsHighlights.tsx">
            <DollarSign className="h-5 w-5" data-id="cnfx7lxkt" data-path="src/components/EarningsHighlights.tsx" />
            <span data-id="7dcmw97s4" data-path="src/components/EarningsHighlights.tsx">Earnings Impact Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-id="86x8d6ix8" data-path="src/components/EarningsHighlights.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="lplot129t" data-path="src/components/EarningsHighlights.tsx">
            <div className="text-center" data-id="i0u4ujsc4" data-path="src/components/EarningsHighlights.tsx">
              <h4 className="font-semibold mb-2" data-id="aitzm3q3n" data-path="src/components/EarningsHighlights.tsx">Overall Beat Rate</h4>
              <p className="text-3xl font-bold text-green-600" data-id="n34griehc" data-path="src/components/EarningsHighlights.tsx">
                {earnings.length > 0 ? Math.round(beats.length / earnings.length * 100) : 0}%
              </p>
              <p className="text-sm text-slate-500" data-id="n0f2s7q81" data-path="src/components/EarningsHighlights.tsx">
                {beats.length} of {earnings.length} companies beat estimates
              </p>
            </div>
            
            <div className="text-center" data-id="r63rh81tv" data-path="src/components/EarningsHighlights.tsx">
              <h4 className="font-semibold mb-2" data-id="17mrglzqg" data-path="src/components/EarningsHighlights.tsx">Average Surprise</h4>
              <p className={`text-3xl font-bold ${
              earnings.length > 0 && earnings.reduce((sum, e) => sum + e.surprisePercent, 0) / earnings.length > 0 ?
              'text-green-600' : 'text-red-600'}`
              } data-id="szuq1att7" data-path="src/components/EarningsHighlights.tsx">
                {earnings.length > 0 ?
                (earnings.reduce((sum, e) => sum + e.surprisePercent, 0) / earnings.length).toFixed(1) : '0.0'
                }%
              </p>
              <p className="text-sm text-slate-500" data-id="s31a9djct" data-path="src/components/EarningsHighlights.tsx">Across all reports</p>
            </div>
            
            <div className="text-center" data-id="zo39ze1gs" data-path="src/components/EarningsHighlights.tsx">
              <h4 className="font-semibold mb-2" data-id="8qnwctvls" data-path="src/components/EarningsHighlights.tsx">Sector Outlook</h4>
              <p className={`text-lg font-semibold ${
              beats.length > misses.length ? 'text-green-600' :
              beats.length < misses.length ? 'text-red-600' : 'text-slate-600'}`
              } data-id="nboxhd4kh" data-path="src/components/EarningsHighlights.tsx">
                {beats.length > misses.length ? 'Positive' :
                beats.length < misses.length ? 'Negative' : 'Neutral'}
              </p>
              <p className="text-sm text-slate-500" data-id="v5azaqti3" data-path="src/components/EarningsHighlights.tsx">
                {beats.length > misses.length ? 'More beats than misses' :
                beats.length < misses.length ? 'More misses than beats' : 'Balanced results'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

};