import { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const NETWORK = clusterApiUrl("devnet");

const WalletBalance = ({ walletAddress }) => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        if (walletAddress) {
            const fetchBalance = async () => {
                try {
                    const connection = new Connection(NETWORK);
                    const pubKey = new PublicKey(walletAddress);
                    const lamports = await connection.getBalance(pubKey);
                    setBalance(lamports / 1e9); // Convert lamports to SOL
                } catch (error) {
                    console.error("Error fetching balance:", error);
                }
            };
            fetchBalance();
        }
    }, [walletAddress]);

    return (
        <div className="flex flex-col gap-3">
            <div>
                <h2 className="text-lg font-medium">Balance</h2>
                <p className="text-sm text-slate-400">Fetched from Solana Devnet</p>
            </div>
            {balance !== null ? (
                <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-cyan-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12 3a9 9 0 1 0 9 9A9.01 9.01 0 0 0 12 3Zm1 14.5H11v-2h2Zm0-4H11V6.5h2Z" />
                    </svg>
                    <span className="font-mono text-base">{balance.toFixed(4)} SOL</span>
                </div>
            ) : (
                <p className="text-slate-400">Loading balance...</p>
            )}
        </div>
    );
};

export default WalletBalance;
