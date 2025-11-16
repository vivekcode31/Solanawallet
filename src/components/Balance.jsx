import { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const NETWORK = clusterApiUrl("devnet");

const WalletBalance = ({ walletAddress }) => {
    const [balance, setBalance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [usdValue, setUsdValue] = useState(null);

    useEffect(() => {
        if (walletAddress) {
            const fetchBalance = async () => {
                try {
                    setIsLoading(true);
                    const connection = new Connection(NETWORK);
                    const pubKey = new PublicKey(walletAddress);
                    const lamports = await connection.getBalance(pubKey);
                    const solBalance = lamports / 1e9;
                    setBalance(solBalance);
                    // Approximate USD value (you can replace with real API)
                    setUsdValue(solBalance * 150); // Example rate
                } catch (error) {
                    console.error("Error fetching balance:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchBalance();
            // Refresh balance every 10 seconds
            const interval = setInterval(fetchBalance, 10000);
            return () => clearInterval(interval);
        }
    }, [walletAddress]);

    return (
        <div className="flex flex-col gap-7 h-full">
            <div className="flex-shrink-0">
                <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-xl font-bold text-white/90 mb-1">Balance</h2>
                        <p className="text-sm text-white/50 font-medium">Real-time portfolio value</p>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col gap-5 flex-grow justify-center">
                    <div className="animate-pulse">
                        <div className="h-24 bg-white/5 rounded-2xl mb-5"></div>
                        <div className="h-14 bg-white/5 rounded-xl"></div>
                    </div>
                </div>
            ) : balance !== null ? (
                <div className="flex flex-col gap-6 flex-grow min-h-0">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/20 via-purple-500/20 to-cyan-500/20 border border-teal-500/30 p-7 shimmer flex-shrink-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <p className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-5">Total Balance</p>
                            <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-400">
                                    {balance.toFixed(4)}
                                </span>
                                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white/80">SOL</span>
                            </div>
                            {usdValue !== null && (
                                <p className="text-sm text-white/60 font-medium">
                                    ≈ ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-auto flex-shrink-0">
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                            <p className="text-xs text-white/50 font-medium mb-2.5">Available</p>
                            <p className="text-base sm:text-lg font-bold text-white/90 truncate">{balance.toFixed(4)} SOL</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                            <p className="text-xs text-white/50 font-medium mb-2.5">Network</p>
                            <p className="text-base sm:text-lg font-bold text-teal-400">Devnet</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                    <p className="text-white/50">Unable to fetch balance</p>
                </div>
            )}
        </div>
    );
};

export default WalletBalance;
