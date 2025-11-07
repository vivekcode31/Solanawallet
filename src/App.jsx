import { useState } from "react";
import PhantomWallet from "./components/Phantom";
import WalletBalance from "./components/Balance";
import SendSol from "./components/Solsend";
import './App.css';

function App() {
    const [walletAddress, setWalletAddress] = useState(null);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="relative">
                <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-16">
                    <header className="mb-10 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3">
                            <img src="/vite.svg" alt="Logo" className="h-10 w-10 opacity-90" />
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Solana dApp
                            </h1>
                        </div>
                        <p className="text-sm text-slate-400">Connect Phantom, view balance, and send SOL</p>
                    </header>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur">
                            <PhantomWallet setWalletAddress={setWalletAddress} />
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur">
                            {walletAddress ? (
                                <WalletBalance walletAddress={walletAddress} />
                            ) : (
                                <p className="text-slate-400">Connect your wallet to see balance</p>
                            )}
                        </div>
                        <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur">
                            {walletAddress ? (
                                <SendSol sender={walletAddress} />
                            ) : (
                                <p className="text-slate-400">Connect your wallet to send SOL</p>
                            )}
                        </div>
                    </div>

                    <footer className="mt-10 text-center text-xs text-slate-500">
                        Built with React, Vite, and Tailwind — Solana Devnet
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default App;
