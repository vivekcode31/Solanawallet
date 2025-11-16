import { useState, useEffect } from "react";

const PhantomWallet = ({ setWalletAddress }) => {
    const [wallet, setWallet] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        if (window.solana && window.solana.isPhantom) {
            window.solana.connect({ onlyIfTrusted: true })
                .then(res => {
                    setWallet(res.publicKey.toString());
                    setWalletAddress(res.publicKey.toString());
                })
                .catch(() => console.log("Wallet not connected"));
        }
    }, [setWalletAddress]);

    const connectWallet = async () => {
        try {
            if (!window.solana) {
                alert("⚠️ Please install Phantom Wallet extension!");
                return;
            }
            setIsConnecting(true);
            const res = await window.solana.connect();
            setWallet(res.publicKey.toString());
            setWalletAddress(res.publicKey.toString());
        } catch (error) {
            console.error("Connection failed:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    const formatAddress = (address) => {
        if (!address) return "";
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    return (
        <div className="flex flex-col gap-7 h-full">
            <div className="flex-shrink-0">
                <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-xl font-bold text-white/90 mb-1">Wallet Connection</h2>
                        <p className="text-sm text-white/50 font-medium">Secure Web3 access</p>
                    </div>
                </div>
            </div>

            {wallet ? (
                <div className="flex flex-col gap-6 flex-grow min-h-0">
                    <div className="glow-badge shimmer flex-shrink-0">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2.5">
                                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Connected</span>
                            </div>
                            <div className="text-xs text-white/60 font-mono font-medium">
                                {formatAddress(wallet)}
                            </div>
                        </div>
                        <div className="bg-black/20 rounded-lg p-5 border border-white/10">
                            <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">Wallet Address</p>
                            <p className="text-sm font-mono text-white/90 break-all leading-relaxed">
                                {wallet}
                            </p>
                        </div>
                    </div>
                    <div className="mt-auto pt-6 border-t border-white/10 flex-shrink-0">
                        <button
                            onClick={() => {
                                if (window.solana) {
                                    window.solana.disconnect();
                                    setWallet(null);
                                    setWalletAddress(null);
                                }
                            }}
                            className="w-full py-3.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-semibold transition-all duration-300"
                        >
                            Disconnect
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-6 flex-grow justify-center min-h-0">
                    <div className="text-center py-3">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/30 flex items-center justify-center">
                            <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <p className="text-sm text-white/50 mb-7 leading-relaxed">Connect your Phantom wallet to begin</p>
                    </div>
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className="holo-button w-full flex items-center justify-center gap-3 flex-shrink-0"
                    >
                        {isConnecting ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Connecting...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>Connect Phantom</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhantomWallet;
