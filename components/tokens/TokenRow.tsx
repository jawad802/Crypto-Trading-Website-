import Link from "next/link";

interface TokenRowProps {
  coin: any;
}

export default function TokenRow({ coin }: TokenRowProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  const formatMarketCap = (num: number) => {
    if (!num) return "$0";
    if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <tr className="border-b border-gray-800/50 hover:bg-[#1f232b] transition-colors">
      <td className="py-4 px-6">
        <Link href={`/coin/${coin.id}`} className="flex items-center gap-3 group">
          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-semibold group-hover:text-green-400 transition-colors">
              {coin.name}
            </p>
            <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
          </div>
        </Link>
      </td>

      <td className="py-4 px-6 font-medium">
        ${coin.current_price?.toLocaleString()}
      </td>

      <td className={`py-4 px-6 font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
        {isPositive ? "+" : ""}
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </td>

      <td className="py-4 px-6 font-medium text-gray-300">
        {formatMarketCap(coin.market_cap)}
      </td>
    </tr>
  );
}