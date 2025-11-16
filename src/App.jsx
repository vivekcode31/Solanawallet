import { useState } from "react";
import PhantomWallet from "./components/Phantom";
import WalletBalance from "./components/Balance";
import SendSol from "./components/Solsend";
import './App.css';

function App() {
    const [walletAddress, setWalletAddress] = useState(null);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated background particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen items-center justify-center py-10 sm:py-14 lg:py-20">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 xl:px-12">
                    {/* Premium Header */}
                    <header className="mb-16 sm:mb-20 lg:mb-24 flex flex-col items-center gap-5">
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl blur-lg opacity-50"></div>
                                <div className="relative bg-gradient-to-br from-purple-600 to-teal-500 p-3 sm:p-3.5 rounded-2xl">
                                    <svg className="w-8 h-8 sm:w-9 sm:h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight">
                                <span className="neon-text">SOLANA</span>
                                <span className="text-white/90 ml-3 sm:ml-4">DASHBOARD</span>
                            </h1>
                        </div>
                        <p className="text-xs sm:text-sm text-white/60 font-medium tracking-wide text-center px-4 max-w-2xl">
                            PREMIUM WEB3 WALLET INTERFACE • CONNECT • TRANSACT • THRIVE
                        </p>
                        <div className="flex items-center gap-2.5 mt-2">
                            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">DEVNET ACTIVE</span>
                        </div>
                    </header>

                    {/* Main Dashboard Grid */}
                    <div className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-14 sm:mb-16 lg:mb-20 ">
                        {/* Wallet Connect Panel */}
                        <div className="glass-card p-7 sm:p-8 lg:p-9 xl:p-10 soft-light flex flex-col">
                            <PhantomWallet setWalletAddress={setWalletAddress} />
                        </div>

                        {/* Balance Card */}
                        <div className="glass-card p-7 sm:p-8 lg:p-9 xl:p-10 soft-light flex flex-col">
                            {walletAddress ? (
                                <WalletBalance walletAddress={walletAddress} />
                            ) : (
                                <div className="flex flex-col gap-5 h-full">
                                    <div>
                                        <h2 className="text-xl font-bold text-white/90 mb-2.5">Balance</h2>
                                        <p className="text-sm text-white/50">Connect wallet to view</p>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 min-h-[120px]">
                                        <span className="text-white/30 text-sm">— — —</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Network Status Card */}
                        <div className="glass-card p-7 sm:p-8 lg:p-9 xl:p-10 soft-light sm:col-span-2 lg:col-span-1 flex flex-col">
                            <div className="flex flex-col gap-5 h-full justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-white/90 mb-2.5">Network</h2>
                                    <p className="text-sm text-white/50">Current connection</p>
                                </div>
                                <div className="glow-badge mt-auto">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-white/90">Solana Devnet</span>
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-xs text-green-400 font-medium">LIVE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Send Transaction Panel */}
                    <div className="glass-card p-7 sm:p-8 lg:p-10 xl:p-12 soft-light mb-14 sm:mb-16 lg:mb-20">
                        {walletAddress ? (
                            <SendSol sender={walletAddress} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24 gap-5">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <p className="text-white/50 text-center max-w-md text-sm sm:text-base px-4 leading-relaxed">
                                    Connect your Phantom wallet to unlock transaction capabilities
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Premium Footer */}
                    <footer className="text-center pt-10 sm:pt-12 lg:pt-14">
                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                            <span className="text-xs text-white/40 font-medium">POWERED BY</span>
                            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
                                REACT • VITE • SOLANA WEB3.JS
                            </span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default App;
