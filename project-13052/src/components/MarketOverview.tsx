import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MarketData } from '@/hooks/useMarketData';
import { TrendingUp, TrendingDown, Activity, Globe, DollarSign, BarChart3 } from 'lucide-react';

interface MarketOverviewProps {
  marketData: MarketData | null;
}

export const MarketOverview = ({ marketData }: MarketOverviewProps) => {
  if (!marketData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="l0ui397nf" data-path="src/components/MarketOverview.tsx">
        {[...Array(4)].map((_, i) =>
        <Card key={i} data-id="iwpbkbzk9" data-path="src/components/MarketOverview.tsx">
            <CardContent className="p-6" data-id="74wvka5iz" data-path="src/components/MarketOverview.tsx">
              <div className="animate-pulse space-y-4" data-id="20jkduki9" data-path="src/components/MarketOverview.tsx">
                <div className="h-4 bg-gray-200 rounded w-3/4" data-id="vdypofs7q" data-path="src/components/MarketOverview.tsx"></div>
                <div className="h-8 bg-gray-200 rounded" data-id="i63mdoplp" data-path="src/components/MarketOverview.tsx"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2" data-id="21x4iicvq" data-path="src/components/MarketOverview.tsx"></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>);

  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':return 'text-green-600';
      case 'bearish':return 'text-red-600';
      default:return 'text-yellow-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':return <TrendingUp className="h-5 w-5" data-id="1yaz2gmbb" data-path="src/components/MarketOverview.tsx" />;
      case 'bearish':return <TrendingDown className="h-5 w-5" data-id="tkgzqd8wt" data-path="src/components/MarketOverview.tsx" />;
      default:return <Activity className="h-5 w-5" data-id="5x1l05oyh" data-path="src/components/MarketOverview.tsx" />;
    }
  };

  const avgMarketMove = marketData.asianStocks.reduce((sum, stock) =>
  sum + stock.changePercent, 0) / marketData.asianStocks.length;

  const gainers = marketData.asianStocks.filter((stock) => stock.changePercent > 0);
  const losers = marketData.asianStocks.filter((stock) => stock.changePercent < 0);

  return (
    <div className="space-y-6" data-id="v5zwhgh36" data-path="src/components/MarketOverview.tsx">
      {/* Market Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="wqtmxzeop" data-path="src/components/MarketOverview.tsx">
        <Card data-id="vhj6wff3g" data-path="src/components/MarketOverview.tsx">
          <CardContent className="p-6" data-id="6auymo0vz" data-path="src/components/MarketOverview.tsx">
            <div className="flex items-center justify-between" data-id="9yv8wqr4z" data-path="src/components/MarketOverview.tsx">
              <div data-id="pep6m6io7" data-path="src/components/MarketOverview.tsx">
                <p className="text-sm text-slate-600" data-id="86h0snga9" data-path="src/components/MarketOverview.tsx">Market Sentiment</p>
                <p className={`text-2xl font-bold capitalize ${getSentimentColor(marketData.marketSentiment.overall)}`} data-id="7kbdec2ru" data-path="src/components/MarketOverview.tsx">
                  {marketData.marketSentiment.overall}
                </p>
              </div>
              <div className={getSentimentColor(marketData.marketSentiment.overall)} data-id="u5wvvp09t" data-path="src/components/MarketOverview.tsx">
                {getSentimentIcon(marketData.marketSentiment.overall)}
              </div>
            </div>
            <div className="mt-4" data-id="c9z26pnl1" data-path="src/components/MarketOverview.tsx">
              <Progress value={marketData.marketSentiment.score} className="h-3" data-id="xtboab32i" data-path="src/components/MarketOverview.tsx" />
              <p className="text-xs text-slate-500 mt-2" data-id="6dxhsxt9e" data-path="src/components/MarketOverview.tsx">
                Sentiment Score: {marketData.marketSentiment.score}/100
              </p>
            </div>
          </CardContent>
        </Card>

        <Card data-id="fybnfu34n" data-path="src/components/MarketOverview.tsx">
          <CardContent className="p-6" data-id="4h2nar4p1" data-path="src/components/MarketOverview.tsx">
            <div className="flex items-center justify-between" data-id="3ln2zredb" data-path="src/components/MarketOverview.tsx">
              <div data-id="anc3slj6j" data-path="src/components/MarketOverview.tsx">
                <p className="text-sm text-slate-600" data-id="royq7jcqs" data-path="src/components/MarketOverview.tsx">Average Move</p>
                <p className={`text-2xl font-bold ${
                avgMarketMove >= 0 ? 'text-green-600' : 'text-red-600'}`
                } data-id="assmnz00y" data-path="src/components/MarketOverview.tsx">
                  {avgMarketMove >= 0 ? '+' : ''}{avgMarketMove.toFixed(2)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" data-id="rs0o0kxwi" data-path="src/components/MarketOverview.tsx" />
            </div>
            <p className="text-xs text-slate-500 mt-2" data-id="1huv0zz1u" data-path="src/components/MarketOverview.tsx">
              Across {marketData.asianStocks.length} Asia tech stocks
            </p>
          </CardContent>
        </Card>

        <Card data-id="o3kpls2az" data-path="src/components/MarketOverview.tsx">
          <CardContent className="p-6" data-id="pagao0ok4" data-path="src/components/MarketOverview.tsx">
            <div className="flex items-center justify-between" data-id="4ej9qp7ch" data-path="src/components/MarketOverview.tsx">
              <div data-id="qtknf554e" data-path="src/components/MarketOverview.tsx">
                <p className="text-sm text-slate-600" data-id="bdtatp6fu" data-path="src/components/MarketOverview.tsx">Gainers vs Losers</p>
                <p className="text-2xl font-bold text-slate-800" data-id="2ojriy6es" data-path="src/components/MarketOverview.tsx">
                  {gainers.length} / {losers.length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-slate-500" data-id="d2x1ktbgp" data-path="src/components/MarketOverview.tsx" />
            </div>
            <p className="text-xs text-slate-500 mt-2" data-id="h690r6l5n" data-path="src/components/MarketOverview.tsx">
              {gainers.length > losers.length ? 'Risk-on sentiment' :
              gainers.length < losers.length ? 'Risk-off sentiment' : 'Mixed sentiment'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Key Market Factors */}
      <Card data-id="l4pui23si" data-path="src/components/MarketOverview.tsx">
        <CardHeader data-id="txlp08fce" data-path="src/components/MarketOverview.tsx">
          <CardTitle className="flex items-center space-x-2" data-id="381yi7rmb" data-path="src/components/MarketOverview.tsx">
            <Globe className="h-5 w-5" data-id="gdnfuog64" data-path="src/components/MarketOverview.tsx" />
            <span data-id="uwu17f7n9" data-path="src/components/MarketOverview.tsx">Key Market Factors</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-id="gr7c37ot6" data-path="src/components/MarketOverview.tsx">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="fdwz851a8" data-path="src/components/MarketOverview.tsx">
            {marketData.marketSentiment.factors.map((factor, index) =>
            <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg" data-id="6w9exafmn" data-path="src/components/MarketOverview.tsx">
                <div className="w-2 h-2 bg-blue-500 rounded-full" data-id="o1mcw8mt8" data-path="src/components/MarketOverview.tsx"></div>
                <span className="text-sm" data-id="frxbqjokw" data-path="src/components/MarketOverview.tsx">{factor}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stock Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="oa46m2i7l" data-path="src/components/MarketOverview.tsx">
        {/* Top Performers */}
        <Card data-id="ouw96gjds" data-path="src/components/MarketOverview.tsx">
          <CardHeader data-id="se1o4cwi8" data-path="src/components/MarketOverview.tsx">
            <CardTitle className="flex items-center space-x-2" data-id="1clujdgi2" data-path="src/components/MarketOverview.tsx">
              <TrendingUp className="h-5 w-5 text-green-600" data-id="qo9g5300i" data-path="src/components/MarketOverview.tsx" />
              <span data-id="gxpp71om1" data-path="src/components/MarketOverview.tsx">Top Performers</span>
            </CardTitle>
          </CardHeader>
          <CardContent data-id="kcbg479p1" data-path="src/components/MarketOverview.tsx">
            <div className="space-y-4" data-id="u39iop9wc" data-path="src/components/MarketOverview.tsx">
              {marketData.asianStocks.
              sort((a, b) => b.changePercent - a.changePercent).
              slice(0, 4).
              map((stock, index) =>
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg" data-id="lnz0vscuj" data-path="src/components/MarketOverview.tsx">
                  <div data-id="p8u1v7dp8" data-path="src/components/MarketOverview.tsx">
                    <p className="font-semibold" data-id="q85clrazn" data-path="src/components/MarketOverview.tsx">{stock.symbol}</p>
                    <p className="text-sm text-slate-600" data-id="hvhahi9s3" data-path="src/components/MarketOverview.tsx">{stock.name}</p>
                    <p className="text-xs text-slate-500" data-id="3msn5rj5k" data-path="src/components/MarketOverview.tsx">
                      Vol: {(stock.volume / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="text-right" data-id="33ynjp01w" data-path="src/components/MarketOverview.tsx">
                    <p className="font-semibold" data-id="64mwje2qa" data-path="src/components/MarketOverview.tsx">${stock.price.toFixed(2)}</p>
                    <p className="text-green-600 font-medium" data-id="68c6qhs6t" data-path="src/components/MarketOverview.tsx">
                      +{stock.changePercent.toFixed(2)}%
                    </p>
                    <p className="text-xs text-green-600" data-id="j9xvgqcko" data-path="src/components/MarketOverview.tsx">
                      +${stock.change.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Underperformers */}
        <Card data-id="mazjzvmgo" data-path="src/components/MarketOverview.tsx">
          <CardHeader data-id="styvzzllc" data-path="src/components/MarketOverview.tsx">
            <CardTitle className="flex items-center space-x-2" data-id="3xc08x68g" data-path="src/components/MarketOverview.tsx">
              <TrendingDown className="h-5 w-5 text-red-600" data-id="jjkv43ywt" data-path="src/components/MarketOverview.tsx" />
              <span data-id="34yr8ap8s" data-path="src/components/MarketOverview.tsx">Underperformers</span>
            </CardTitle>
          </CardHeader>
          <CardContent data-id="rba4kb1ho" data-path="src/components/MarketOverview.tsx">
            <div className="space-y-4" data-id="6dvit63sp" data-path="src/components/MarketOverview.tsx">
              {marketData.asianStocks.
              sort((a, b) => a.changePercent - b.changePercent).
              slice(0, 4).
              map((stock, index) =>
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg" data-id="igjqo91u4" data-path="src/components/MarketOverview.tsx">
                  <div data-id="0zzsqv3pr" data-path="src/components/MarketOverview.tsx">
                    <p className="font-semibold" data-id="is9lx49mz" data-path="src/components/MarketOverview.tsx">{stock.symbol}</p>
                    <p className="text-sm text-slate-600" data-id="23doht9kk" data-path="src/components/MarketOverview.tsx">{stock.name}</p>
                    <p className="text-xs text-slate-500" data-id="4f08jg1x0" data-path="src/components/MarketOverview.tsx">
                      Vol: {(stock.volume / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="text-right" data-id="h5hpabowd" data-path="src/components/MarketOverview.tsx">
                    <p className="font-semibold" data-id="07volkgio" data-path="src/components/MarketOverview.tsx">${stock.price.toFixed(2)}</p>
                    <p className="text-red-600 font-medium" data-id="91lvldp6x" data-path="src/components/MarketOverview.tsx">
                      {stock.changePercent.toFixed(2)}%
                    </p>
                    <p className="text-xs text-red-600" data-id="i66idviux" data-path="src/components/MarketOverview.tsx">
                      ${stock.change.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Stocks Table */}
      <Card data-id="rf11dcou5" data-path="src/components/MarketOverview.tsx">
        <CardHeader data-id="ngx8fdol1" data-path="src/components/MarketOverview.tsx">
          <CardTitle className="flex items-center space-x-2" data-id="jny67t0fy" data-path="src/components/MarketOverview.tsx">
            <DollarSign className="h-5 w-5" data-id="fvo53m8an" data-path="src/components/MarketOverview.tsx" />
            <span data-id="suron1xrx" data-path="src/components/MarketOverview.tsx">Asia Tech Holdings</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-id="b0pua7yxc" data-path="src/components/MarketOverview.tsx">
          <div className="overflow-x-auto" data-id="3ufzhiing" data-path="src/components/MarketOverview.tsx">
            <table className="w-full text-sm" data-id="d2kigb3rw" data-path="src/components/MarketOverview.tsx">
              <thead data-id="3r2ei4mlv" data-path="src/components/MarketOverview.tsx">
                <tr className="border-b" data-id="2b3q546au" data-path="src/components/MarketOverview.tsx">
                  <th className="text-left py-2" data-id="wv1r9usab" data-path="src/components/MarketOverview.tsx">Symbol</th>
                  <th className="text-left py-2" data-id="xce52bjv5" data-path="src/components/MarketOverview.tsx">Company</th>
                  <th className="text-right py-2" data-id="ig3mua263" data-path="src/components/MarketOverview.tsx">Price</th>
                  <th className="text-right py-2" data-id="50sr6tnec" data-path="src/components/MarketOverview.tsx">Change</th>
                  <th className="text-right py-2" data-id="hd4l3fpad" data-path="src/components/MarketOverview.tsx">Change %</th>
                  <th className="text-right py-2" data-id="zfui2jxdu" data-path="src/components/MarketOverview.tsx">Volume</th>
                </tr>
              </thead>
              <tbody data-id="z273vze6i" data-path="src/components/MarketOverview.tsx">
                {marketData.asianStocks.map((stock, index) =>
                <tr key={index} className="border-b hover:bg-slate-50" data-id="9dlzr24fi" data-path="src/components/MarketOverview.tsx">
                    <td className="py-3 font-medium" data-id="8r45x1vej" data-path="src/components/MarketOverview.tsx">{stock.symbol}</td>
                    <td className="py-3 text-slate-600" data-id="9a9rv2g46" data-path="src/components/MarketOverview.tsx">{stock.name}</td>
                    <td className="py-3 text-right font-medium" data-id="jb2cse1uw" data-path="src/components/MarketOverview.tsx">${stock.price.toFixed(2)}</td>
                    <td className={`py-3 text-right ${
                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`
                  } data-id="u9sttbs94" data-path="src/components/MarketOverview.tsx">
                      {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
                    </td>
                    <td className={`py-3 text-right font-medium ${
                  stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`
                  } data-id="eeyzfu7q5" data-path="src/components/MarketOverview.tsx">
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </td>
                    <td className="py-3 text-right text-slate-600" data-id="uhbyvtrt7" data-path="src/components/MarketOverview.tsx">
                      {(stock.volume / 1000000).toFixed(1)}M
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Market Statistics */}
      <Card data-id="cloyra3l4" data-path="src/components/MarketOverview.tsx">
        <CardHeader data-id="w8rae2xg5" data-path="src/components/MarketOverview.tsx">
          <CardTitle data-id="pyb23uc01" data-path="src/components/MarketOverview.tsx">Market Statistics</CardTitle>
        </CardHeader>
        <CardContent data-id="lgd4ca89q" data-path="src/components/MarketOverview.tsx">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-id="bx3z4ty97" data-path="src/components/MarketOverview.tsx">
            <div className="text-center" data-id="kqt6wqs6d" data-path="src/components/MarketOverview.tsx">
              <p className="text-sm text-slate-600" data-id="ttyf8wodu" data-path="src/components/MarketOverview.tsx">Total Volume</p>
              <p className="text-2xl font-bold" data-id="fqi0p8zfo" data-path="src/components/MarketOverview.tsx">
                {(marketData.asianStocks.reduce((sum, stock) => sum + stock.volume, 0) / 1000000000).toFixed(1)}B
              </p>
            </div>
            <div className="text-center" data-id="33hcox1wt" data-path="src/components/MarketOverview.tsx">
              <p className="text-sm text-slate-600" data-id="04pzlhcpd" data-path="src/components/MarketOverview.tsx">Advancing</p>
              <p className="text-2xl font-bold text-green-600" data-id="ginv431u0" data-path="src/components/MarketOverview.tsx">{gainers.length}</p>
            </div>
            <div className="text-center" data-id="obv3fzmv5" data-path="src/components/MarketOverview.tsx">
              <p className="text-sm text-slate-600" data-id="cypmpjgz7" data-path="src/components/MarketOverview.tsx">Declining</p>
              <p className="text-2xl font-bold text-red-600" data-id="u1fhdvw4g" data-path="src/components/MarketOverview.tsx">{losers.length}</p>
            </div>
            <div className="text-center" data-id="gq6a7qtyf" data-path="src/components/MarketOverview.tsx">
              <p className="text-sm text-slate-600" data-id="8iso6epz4" data-path="src/components/MarketOverview.tsx">Unchanged</p>
              <p className="text-2xl font-bold text-slate-600" data-id="ly676neok" data-path="src/components/MarketOverview.tsx">
                {marketData.asianStocks.length - gainers.length - losers.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

};